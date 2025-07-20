import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import zmanim from './zmanim.model';

@Injectable({
  providedIn: 'root',
})
export class HebrewDateService {
  baseUrl = 'https://www.hebcal.com/zmanim?cfg=json&geonameid=281184&date=';

  constructor(private http: HttpClient) {}

  async getShkiah(date: string) {
    const url = this.baseUrl + date;
    const response = await firstValueFrom(this.http.get<zmanim>(url));
    return response.times.sunset;
  }
  async getAlos(date: string) {
    const url = this.baseUrl + date;
    const response = await firstValueFrom(this.http.get<zmanim>(url));
    return response.times.alotHaShachar;
  }
}
