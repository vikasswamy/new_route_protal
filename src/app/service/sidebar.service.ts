import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor(private http: HttpClient) { 
    
  }
  getShiftsList() {
    return this.http.get(environment.apiBaseUrl + 'equipmentdata/facilities/')
  }
  getFloorsList():Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'equipmentdata/facilities/')
  }
  getroutesList():Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'equipmentdata/facilities/')
  }
  getTeamMemberAvailability(shiftfloorroutedata: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + 'page/privacy', shiftfloorroutedata)
  }
}
