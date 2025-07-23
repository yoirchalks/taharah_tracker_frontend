import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PeriodsService {
  periods$ = signal<any[]>([]);
  periods = this.periods$.asReadonly();

  httpService = inject(HttpClient);
  url = `${environment.apiUrl}/periods`;

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

  mockGetPeriods(
    userId: string,
    startDate: string,
    endDate: string,
    page: number,
    limit: number
  ): Observable<{ data: any[]; total: number }> {
    return this.httpService.get<any[]>('/mockPeriods.json').pipe(
      map((allPeriods) => {
        const filtered = allPeriods.filter((p) => {
          const date = new Date(p.period_dateTime);
          return (
            p.userId === userId &&
            (!startDate || date >= new Date(startDate)) &&
            (!endDate || date <= new Date(endDate))
          );
        });

        // Paginate
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const data = filtered.slice(startIndex, endIndex);

        return {
          data,
          total: filtered.length,
        };
      })
    );
  }
}
