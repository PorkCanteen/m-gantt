import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'm-gantt';

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
