import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'm-gantt';

  // 数据配置
  public config: any = {
    // 是否展开子项
    openSub: true
  }

  // 测试数据
  public data: Array<any> = [
    { id: '0', name: '任务1', startDate: '2022/9/10', endDate: '2022/9/20', status: '进行中', duration: 10, progress: 0.6 },
    { id: '01', name: '子任务1', startDate: '2022/9/10', endDate: '2022/9/15', status: '进行中', duration: 5, progress: 0.9, parentId: '0' },
    { id: '02', name: '子任务2', startDate: '2022/9/15', endDate: '2022/9/20', status: '进行中', duration: 5, progress: 0.3, parentId: '0' },
    { id: '1', name: '任务2', startDate: '2022/9/15', endDate: '2022/9/25', status: '进行中', duration: 10, progress: 0.6 },
    { id: '11', name: '子任务1', startDate: '2022/9/15', endDate: '2022/9/20', status: '进行中', duration: 5, progress: 0.8, parentId: '1' },
    { id: '12', name: '子任务2', startDate: '2022/9/20', endDate: '2022/9/25', status: '进行中', duration: 5, progress: 0.4, parentId: '1' },
    { id: '2', name: '任务3', startDate: '2022/9/15', endDate: '2022/9/29', status: '进行中', duration: 14, progress: 0.6 },
    { id: '3', name: '任务4', startDate: '2022/9/17', endDate: '2022/9/27', status: '进行中', duration: 10, progress: 0.6 },
    { id: '4', name: '任务5', startDate: '2022/9/20', endDate: '2022/9/30', status: '进行中', duration: 10, progress: 0.6 },
    { id: '5', name: '任务6', startDate: '2022/9/25', endDate: '2022/10/5', status: '进行中', duration: 10, progress: 0.6 },
    { id: '6', name: '任务7', startDate: '2022/9/25', endDate: '2022/10/7', status: '进行中', duration: 12, progress: 0.6 },
    { id: '7', name: '任务8', startDate: '2022/9/30', endDate: '2022/10/13', status: '进行中', duration: 13, progress: 0.6 },
  ]
  public customisedList: Array<any> = [
    { title: '版本1.0', startDate: '2022/9/7', endDate: '2022/9/15' },
    { title: '版本1.1', startDate: '2022/9/15', endDate: '2022/9/24' },
    { title: '版本2.0', startDate: '2022/9/24', endDate: '2022/9/30' },
    { title: '版本2.1', startDate: '2022/9/30', endDate: '2022/10/5' },
    { title: '版本2.2', startDate: '2022/10/5', endDate: '2022/10/13' },
  ]

  // 样式配置
  public styleOptions = {
    containerWidth: '1600px',
  }

  public createTask(e: any): void {
    console.log('创建一级数据');
  }

  public createSubTask(e: any): void {
    console.log('创建二级数据', e);
  }

  public editTask(e: any): void {
    console.log('编辑数据', e);
  }
}
