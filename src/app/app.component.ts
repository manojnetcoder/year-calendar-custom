import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };
  actions: any[] = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      name: 'delete'
    },
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      name: 'edit'
    }
  ];
  events: any = [
    {
      start: new Date(),
      end: new Date(),
      title: 'title event 1',
      color: this.colors.red,
      actions: this.actions
    },
    {
      start: new Date(2019,3,22),
      end: new Date(2019,3,23),
      title: 'title event 2',
      color: this.colors.yellow,
      actions: this.actions
    },
    {
      start: new Date(2019,5,10),
      end: new Date(2019,5,12),
      title: 'title event 3',
      color: this.colors.blue,
      actions: this.actions
    }
  ]
  viewDate: Date = new Date();
  themecolor: any = '#0a5ab3';
  enableRangeSelection: Boolean = true;
  enableContextMenu: Boolean = true;
  //selected: {startDate: (new Date(2019, 3, 10)), endDate: (new Date(2019, 3, 15)) };

  actionClicked(event) {
    console.log(event);
  }
  eventClicked(event) {
    console.log(event);
  }
  selectRange() {
    debugger;
    console.log(event);
  }
  selectRangeFn() {
    debugger;
  }

}