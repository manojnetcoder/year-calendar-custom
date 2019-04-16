import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from "@angular/core";
import * as cloneDeep from "lodash/cloneDeep";
import { DomSanitizer } from '@angular/platform-browser';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
const clone: cloneDeep = (<any>cloneDeep).default || cloneDeep
@Component({
  selector: 'angular-calendar-year-view',
  templateUrl: './angular-calendar-year-view.component.html',
  styleUrls: ['./angular-calendar-year-view.component.scss']
})
export class AngularCalendarYearViewComponent implements OnInit {    
   
  @HostBinding('style')
  get style() {
    return this.sanitizer.bypassSecurityTrustStyle(
      `--themecolor: ${this.themecolor};`
    );
  }
  @Input()
  themecolor: any = '#ff0000'
  @Input()
  events = [];

  @Input()
  viewDate: Date = new Date();

  @Input()
  enableRangeSelection: Boolean = true;

  @Input()
  enableContextMenu: Boolean = true;

  @Output()
  eventClicked = new EventEmitter<any>();

  @Output()
  actionClicked = new EventEmitter<any>();

  @Output()
  selectRange = new EventEmitter<any>();

  loader: any = false;
  days: any = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  daysFull: any = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months: any = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dayindex: any;
  daydetails: any = {};
  year: any = new Date().getFullYear();
  month: any = new Date().getMonth();
  calendar: any = [];
  spinner: any = true;
  calendarMode: string = "year";
  constructor(public sanitizer: DomSanitizer

  ) { }
  ngOnInit() {
    this.initYearCalendar(this.viewDate);
    //this.selectRange.emit({ event: event });
  }
  ngOnChanges() {
    this.initYearCalendar(this.viewDate);
  }
  initYearCalendar(date) {
    this.year = date.getFullYear();
    this.calendar = [];
    this.spinner = true;
    for (let index = 0; index < 12; index++) {
      this.calendar.push({
        date: new Date(this.year, index + 1, 0),
        days: this.generateCalendar(index + 1, this.year)
      });
    }
    let self = this;
    setTimeout(() => {
      self.spinner = false;
    }, 1000);
  }
  initMonthCalendar(date) {
    this.viewDate = date;
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.calendar = [];
    this.spinner = true;
    this.calendar = [];
    this.calendar.push({
      date: new Date(this.year, this.month + 1, 0),
      days: this.generateCalendar(this.month + 1, this.year)
    });
    let self = this;
    setTimeout(() => {
      self.spinner = false;
    }, 1000);
  }
  generateCalendar(month, year) {
    let monthList = [];
    let nbweeks = this.getNbWeeks(month, year);
    let dayone = new Date(year, month - 1, 1).getDay();
    let nbdaysMonth = new Date(year, month, 0).getDate();
    let lastdayindex = new Date(year, month - 1, nbdaysMonth).getDay();
    let lastday = 7;
    let day = 1;
    let today = new Date().toDateString();

    for (let indexweek = 0; indexweek < nbweeks; indexweek++) {
      monthList[indexweek] = [];
      if (nbweeks == indexweek + 1) {
        lastday = lastdayindex + 1;
      }
      if (indexweek > 0) {
        dayone = 0;
      }
      for (let indexday = dayone; indexday < lastday; indexday++) {
        let d1 = new Date(year, month - 1, day).toDateString();
        let istoday = d1 == today;
        let colorsEvents = this.getnbevents(day, month - 1)
        monthList[indexweek][indexday] = {
          day: day,
          istoday: istoday,
          colors: colorsEvents.color,
          events: [],
          nb: colorsEvents.nb
        };
        day++;
      }
    }
    return monthList;
  }
  getNbWeeks(month, year) {
    let dayone = new Date(year, month - 1, 1).getDay();
    let nbdaysMonth = new Date(year, month, 0).getDate();
    let lastday = new Date(year, month - 1, nbdaysMonth).getDay();
    return (nbdaysMonth + dayone + (6 - lastday)) / 7;
  }
  getTodayEvents(day, month) {
    month = (month === 0 ? this.month : month);
    this.daydetails = {};
    if (this.events.length > 0) {
      this.loader = true;
      this.daydetails = clone(day);
      let d1 = new Date(this.year, month, day.day).toDateString();

      for (let index = 0; index < this.events.length; index++) {
        const element = this.events[index];
        let d2 = element.start.toDateString();
        if (d2 == d1) {
          this.daydetails.events.push(element);
        }
        if (index == this.events.length - 1) {
          let self = this;
          setTimeout(() => {
            self.loader = false;
          }, 1000);
        }

      }
    }
  }
  getnbevents(day, month) {
    let nb = 0;
    let colors = []
    if (this.events.length > 0) {
      let d1 = new Date(this.year, month, day).toDateString();
      for (let index = 0; index < this.events.length; index++) {
        const element = this.events[index];
        let d2 = element.start.toDateString();
        if (d2 == d1) {
          nb++;
          colors.push(element.color.secondary)
        }
      }
      return ({ nb: nb, color: colors.toString() })
    } else {
      return { color: "", nb: 0 }
    }
  }
  eventClickedFn(event) {
    this.eventClicked.emit(event);
  }
  refresh(date) {
    this.initYearCalendar(date);
  }
  actionClickedFn(action, event?) {
    this.actionClicked.emit({ action: action, event: event });
  }
  selectRangeFn(event) {
    debugger;
    this.selectRange.emit({ event: event });
  }

  // onActionClicked = function(action,event?){
  //   console.log(action);
  //   console.log(event);
  //      this.actionClicked.emit({action:action,event:event})
  // }
  // onEventClicked = function(event){
  //   debugger;
  //   console.log(event);
  //   this.eventClicked.emit(event);
  // }
  fnPrev() {
    (this.calendarMode === 'year' ? (this.year = this.year - 1) : (this.month = this.month - 1));
    this.fnResetCalendar();
  }

  fnNext() {
    (this.calendarMode === 'year' ? (this.year = this.year + 1) : (this.month = this.month + 1));
    this.fnResetCalendar();
  }

  fnResetCalendar() {
    (this.calendarMode === 'year' ? this.initYearCalendar(new Date(this.year, 1, 0)) : this.initMonthCalendar(new Date(this.year, this.month, 1)));
  }

  calendarView(mode) {
    this.calendarMode = mode;
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
    this.fnResetCalendar();
  }

  selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected
    console.log(value);
debugger;
}
calendarApplied(event){
  debugger;
}
}
