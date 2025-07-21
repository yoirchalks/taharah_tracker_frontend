import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import ZmanimData from '../models/zmanim.model';

@Injectable({
  providedIn: 'root',
})
export class HebrewDateService {
  baseUrl = 'https://www.hebcal.com/zmanim?cfg=json&geonameid=281184&date=';

  httpClient = inject(HttpClient);

  async getShkiah(date: string) {
    const url = this.baseUrl + date;
    const response = await firstValueFrom(this.httpClient.get<ZmanimData>(url));
    return response.times.sunset;
  }
  async getAlos(date: string) {
    const url = this.baseUrl + date;
    const response = await firstValueFrom(this.httpClient.get<ZmanimData>(url));
    return response.times.alotHaShachar;
  }
}
