import { Component, inject, OnInit } from '@angular/core';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HebrewDateService } from '../../shared/services/hebrew-date.service';

import { HDate } from '@hebcal/core';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  zmanimService = inject(HebrewDateService);

  calendarOptions: CalendarOptions = {
    timeZone: 'Asia/Jerusalem',
    plugins: [dayGridPlugin, interactionPlugin],
    selectable: true,
    showNonCurrentDates: false,
    dayCellDidMount: (args) => {
      const date = args.date;
      const hDate = new HDate(date);

      const hebDiv = document.createElement('div');
      hebDiv.innerText = `${hDate.getDate()} ${hDate.getMonthName()}`;
      hebDiv.style.fontSize = '0.65em';
      hebDiv.style.textAlign = 'right'; //move proper to corner and and space bottom

      args.el.querySelector('.fc-daygrid-day-top')?.appendChild(hebDiv);
    },
  };

  async ngOnInit() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const [alos, shkiah] = await Promise.all([
      this.zmanimService.getAlos(todayStr),
      this.zmanimService.getShkiah(todayStr),
    ]);

    const alosEvent = {
      title: 'Alot HaShachar',
      start: alos,
      allDay: false,
    };

    const shkiahEvent = {
      title: 'Shkiah',
      start: shkiah,
      allDay: false,
    };

    this.calendarOptions.events = [alosEvent, shkiahEvent];
  }
}
