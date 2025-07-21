import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PeriodsService {
  periods$ = signal<any[]>([]);
  periods = this.periods$.asReadonly();

  httpService = inject(HttpClient);
  url = 'https://taharah-tracker-backend.onrender.com/api/periods';

  postPeriod(type: string, date: string) {
    this.httpService.post(this.url, { periodType: type, dateTime: date });
  }

  getPeriods(
    userId: any,
    startDate: string,
    endDate: string,
    limit: number,
    page: number
  ) {
    const httpParams = new HttpParams();
    if (startDate) httpParams.set('startDate', startDate);
    if (endDate) httpParams.set('endDate', endDate);
    if (limit != null) httpParams.set('limit', limit);
    if (page != null) httpParams.set('page', page);

    this.httpService
      .get<any[]>(`${this.url}/${userId}`, { params: httpParams })
      .subscribe({
        next: (periods) => this.periods$.set(periods),
        error: (err) => alert(err),
      });
  }
}
