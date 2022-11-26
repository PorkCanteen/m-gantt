import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { columns, customisedList, data } from './data';

@Component({
  selector: 'app-m-gantt',
  templateUrl: './m-gantt.component.html',
  styleUrls: ['./m-gantt.component.less'],
  providers: [DatePipe]
})
export class MGanttComponent implements OnInit, AfterViewInit, OnDestroy {

  // 自定义样式
  @Input() options: any;

  // 1. 可定义变量
  public containerWidth: string = '1500px'; // 容器宽度
  public containerHeight: string = 'auto'; // 容器高度
  public lineHeight: number = 43; // 行高
  public timeLineHeight: number = 30; // 时间轴高度（单层）
  public squareWidth: number = 40; // 格子宽度
  public barHeight: number = 24; // 进度条高度
  public headHeight: number = 90; // 头部整体高度

  public progressBarColor: string = '#1e80ff'; // 进度颜色
  public barColor: string = '#91beff'; // 进度条颜色
  public subBarColor: string = '#e6a23c'; // 子进度颜色
  public subProgressBarColor: string = '#f56c6c'; // 子进度条颜色
  public barFontColor: string = '#fff'; // 进度条文字颜色

  @ViewChild('table') table: any;
  @ViewChild('chart') chart: any;

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.preprocessStyles(this.options);
    this.setGanttData();
    this.setCustomisedData();
  }

  private preprocessStyles(styles: any): void {
    this.containerWidth = styles.containerWidth || this.containerWidth;
    this.containerHeight = styles.containerHeight || this.containerHeight;
    this.lineHeight = styles.lineHeight || this.lineHeight;
    this.timeLineHeight = styles.timeLineHeight || this.timeLineHeight;
    this.squareWidth = styles.squareWidth || this.squareWidth;
    this.barHeight = styles.barHeight || this.barHeight;
    this.progressBarColor = styles.progressBarColor || this.progressBarColor;
    this.barColor = styles.barColor || this.barColor;
    this.subBarColor = styles.subBarColor || this.subBarColor;
    this.subProgressBarColor = styles.subProgressBarColor || this.subProgressBarColor;
    this.barFontColor = styles.barFontColor || this.barFontColor;
  }

  public scrollLock = {
    isTableScroll: false,
    isChartScroll: false
  }

  // 2. 布局
  ngAfterViewInit(): void {
    // 监听左侧表格
    this.table.nativeElement.addEventListener('scroll', this.scrollChart);
    // 监听右侧表格
    this.chart.nativeElement.addEventListener('scroll', this.scrollTable);
    // 根据表格高度设置进度条行高
    this.lineHeight = document.querySelectorAll('.row')[0].clientHeight;
  }
  private scrollChart = (e: any) => {
    // 当右侧进度图没有滚动时，使之随表格滚动
    if (!this.scrollLock.isChartScroll) {
      this.scrollLock.isTableScroll = true;
      this.chart.nativeElement.scroll({
        top: e.target?.scrollTop
      })
    }
    this.scrollLock.isTableScroll = false;
  }
  private scrollTable = (e: any) => {
    // 当左侧表格没有滚动时，使之随进度图滚动
    if (!this.scrollLock.isTableScroll) {
      this.scrollLock.isChartScroll = true;
      this.table.nativeElement.scroll({
        top: e.target?.scrollTop
      })
    }
    this.scrollLock.isChartScroll = false;
  }

  ngOnDestroy(): void {
    this.table.nativeElement.removeEventListener('scroll', this.scrollChart);
    this.chart.nativeElement.removeEventListener('scroll', this.scrollTable);
    document.removeEventListener('mousemove', this.moveModal);
  }

  // 3. 数据
  public ganttConfig: any = {
    columns: columns,
    data: data,
    chartData: []
  }
  // 数据预处理
  private preprocessData(data: Array<any>): Array<any> {
    data.forEach(row => {
      const startDay = (new Date(row.startDate).getTime() - this.dateConfig.startDate.getTime()) / (24 * 60 * 60 * 1000);
      row.startDay = startDay;
    })
    return data;
  }

  // 4. 时间轴
  public dateConfig: any = {
    startDate: new Date('2077/12/31'),
    endDate: new Date('1999/01/01'),
    total: 0,
    svgWidth: 0,
    svgHeight: 60,
    dateList: [],
    monthList: [],
    customisedList: []
  }
  // 配置时间轴数据
  private setGanttData(): void {
    this.ganttConfig.data.forEach((task: any) => {
      const { startDate, endDate } = task;
      if (startDate && new Date(startDate) < this.dateConfig.startDate) {
        this.dateConfig.startDate = new Date(startDate)
      }
      if (endDate && new Date(endDate) > this.dateConfig.endDate) {
        this.dateConfig.endDate = new Date(endDate);
      }
    })
    // 前后加几天保证显示效果
    this.dateConfig.endDate = new Date(this.dateConfig.endDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    this.dateConfig.startDate = new Date(this.dateConfig.startDate.getTime() - 3 * 24 * 60 * 60 * 1000);
    this.dateConfig.total = (this.dateConfig.endDate.getTime() - this.dateConfig.startDate.getTime()) / (24 * 60 * 60 * 1000);
    this.dateConfig.svgWidth = this.dateConfig.total * this.squareWidth;
    // 时间轴
    // 日
    const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (let i = 0; i < this.dateConfig.total; i++) {
      this.dateConfig.dateList.push({
        text: this.datePipe.transform(new Date(this.dateConfig.startDate.getTime() + i * 24 * 60 * 60 * 1000), 'dd'),
        day: week[new Date(this.dateConfig.startDate.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
        month: this.datePipe.transform(new Date(this.dateConfig.startDate.getTime() + i * 24 * 60 * 60 * 1000), 'yyyy-MM'),
      })
    }
    // 月
    const monthMap = new Map();
    this.dateConfig.dateList.forEach((date: any) => {
      const month = date.month;
      if (monthMap.has(month)) {
        monthMap.set(month, monthMap.get(month) + 1)
      } else {
        monthMap.set(month, 1)
      }
    })
    let lengthBefore: number = 0;
    monthMap.forEach((value, key) => {
      this.dateConfig.monthList.push({
        text: key,
        left: lengthBefore
      })
      lengthBefore += value;
    })
    // 数据预处理
    this.ganttConfig.data = this.preprocessData(data);
    this.ganttConfig.chartData = this.ganttConfig.data.filter((row: any) => {
      return row.show === true;
    })
  }
  // 配置自定义时间轴
  private setCustomisedData(): void {
    customisedList.forEach(item => {
      const start = (new Date(item.startDate).getTime() - this.dateConfig.startDate.getTime()) / (24 * 60 * 60 * 1000);
      const length = (new Date(item.endDate).getTime() - new Date(item.startDate).getTime()) / (24 * 60 * 60 * 1000);
      this.dateConfig.customisedList.push({
        title: item.title,
        start,
        length
      })
    })
  }

  // 5. 弹窗显示详情
  @ViewChild('msgModal') msgModal: any;
  public showModal: boolean = false;
  public modalData: any = {
    name: '任务1',
    startDate: '2022/10/01',
    status: '进行中',
    progress: ''
  }
  public showDetail(row: any, flag = false): void {
    if (flag) {
      this.showModal = true;
      this.modalData.name = row.name;
      this.modalData.startDate = row.startDate;
      this.modalData.status = row.status;
      this.modalData.progress = row.progress;
      document.addEventListener('mousemove', this.moveModal)
    } else {
      this.showModal = false
    }
  }
  private moveModal = (e: any) => {
    document.querySelector('#msg-modal')?.setAttribute('style', `top: ${e.clientY + 23}px; left: ${e.clientX + 12}px`);
  }

  // 6. 表格展开
  public showSubData(id: string): void {
    this.ganttConfig.data.forEach((item: any) => {
      if (item.id === id) {
        item.open = !item.open;
      }
      if (item.parentId === id) {
        item.show = !item.show;
      }
    })
    this.ganttConfig.chartData = this.ganttConfig.data.filter((row: any) => {
      return row.show === true
    })
  }

  // 7. 点击任务自动滚动(单击)
  private time: number = 200;
  private timeout: any = null;
  public scrollToBar(row: any): void {
    clearTimeout(this.timeout); // 清除第一个单击事件
    this.timeout = setTimeout(() => {
      const targetBar = document.querySelector(`#bar_${this.ganttConfig.chartData.indexOf(row)}`);
      if (targetBar && this.table) {
        // 目标进度条左侧与client距离
        const x = targetBar.getBoundingClientRect().left;
        // table右侧与client距离
        const parentX = this.table.nativeElement.getBoundingClientRect().right;
        const preScroll = this.chart.nativeElement.scrollLeft || 0;
        const diff = x - parentX;
        // 滚动
        this.chart.nativeElement.scrollTo({
          left: preScroll + diff,
          behavior: 'smooth'
        })
      }
    }, this.time)
  }

  // 8. 创建/编辑任务(双击)
  @Output() createTask = new EventEmitter();
  @Output() createSubTask = new EventEmitter();
  @Output() editTask = new EventEmitter();
  public editRow(row: any = null, isCreate: boolean = false): void {
    clearTimeout(this.timeout);
    if (isCreate) {
      // 创建数据处理
      if (row) {
        // 创建二级数据
        this.createSubTask.emit(row);
      } else {
        // 创建一级数据
        this.createTask.emit(row);
      }
    } else {
      // 双击编辑数据处理
      this.editTask.emit(row);
    }
  }
}