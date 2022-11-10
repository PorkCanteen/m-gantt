export const columns: Array<any> = [
  { title: '', width: '20px', field: 'icon' },
  { title: '名称', width: '100px', field: 'name' },
  { title: '开始时间', width: '100px', field: 'startDate' },
  { title: '结束时间', width: '100px', field: 'endDate' },
  { title: '状态', width: '100px', field: 'status' },
  { title: '+', width: '50px', field: 'tools' },
]

export const data: Array<any> = [
  { id: '0', name: '任务1', startDate: '2022-9-10', endDate: '2022-9-20', status: '进行中', duration: 10, progress: 0.6, open: true, show: true },
  { id: '01', name: '子任务1', startDate: '2022-9-10', endDate: '2022-9-15', status: '进行中', duration: 5, progress: 0.9, parentId: '0', show: true },
  { id: '02', name: '子任务2', startDate: '2022-9-15', endDate: '2022-9-20', status: '进行中', duration: 5, progress: 0.3, parentId: '0', show: true },
  { id: '1', name: '任务2', startDate: '2022-9-15', endDate: '2022-9-25', status: '进行中', duration: 10, progress: 0.6, open: true, show: true },
  { id: '11', name: '子任务1', startDate: '2022-9-15', endDate: '2022-9-20', status: '进行中', duration: 5, progress: 0.8, parentId: '1', show: true },
  { id: '12', name: '子任务2', startDate: '2022-9-20', endDate: '2022-9-25', status: '进行中', duration: 5, progress: 0.4, parentId: '1', show: true },
  { id: '2', name: '任务3', startDate: '2022-9-15', endDate: '2022-9-29', status: '进行中', duration: 14, progress: 0.6, open: false, show: true },
  { id: '3', name: '任务4', startDate: '2022-9-17', endDate: '2022-9-27', status: '进行中', duration: 10, progress: 0.6, open: false, show: true },
  { id: '4', name: '任务5', startDate: '2022-9-20', endDate: '2022-9-30', status: '进行中', duration: 10, progress: 0.6, open: false, show: true },
  { id: '5', name: '任务6', startDate: '2022-9-25', endDate: '2022-10-5', status: '进行中', duration: 10, progress: 0.6, open: false, show: true },
  { id: '6', name: '任务7', startDate: '2022-9-25', endDate: '2022-10-7', status: '进行中', duration: 12, progress: 0.6, open: false, show: true },
  { id: '7', name: '任务8', startDate: '2022-9-30', endDate: '2022-10-13', status: '进行中', duration: 13, progress: 0.6, open: false, show: true },
]

export const customisedList: Array<any> = [
  { title: '版本1.0', startDate: '2022/9/7', endDate: '2022/9/15' },
  { title: '版本1.1', startDate: '2022/9/15', endDate: '2022/9/24' },
  { title: '版本2.0', startDate: '2022/9/24', endDate: '2022/9/30' },
  { title: '版本2.1', startDate: '2022/9/30', endDate: '2022/10/5' },
  { title: '版本2.2', startDate: '2022/10/5', endDate: '2022/10/13' },
]