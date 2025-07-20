import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PeriodsService {
  periods$ = signal<any[]>([]);
  periods = this.periods$.asReadonly();

  httpService = inject(HttpClient);
  url = 'https://taharah-tracker-backend.onrender.com/api/periods';

  getPeriods(
    userId: any,
    startDate: string,
    endDate: string,
    limit: number,
    page: number
  ) {
    this.httpService
      .get<any[]>(
        `${this.url}/:${userId}?startDate=${startDate}endDate=${endDate}limit=${limit}page=${page}`
      )
      .subscribe({
        next: (periods) => this.periods$.set(periods),
        error: (err) => alert(err),
      });
  }
}
