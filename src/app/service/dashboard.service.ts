
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  constructor(private http: HttpClient) {
  }

  updateMemberAvailabilityData(memberavailability: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + 'page/privacy', memberavailability)
  }
}


