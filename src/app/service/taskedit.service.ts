import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class TaskEditService {

 private selectedFilters = new BehaviorSubject<any>('');
 filterdata = this.selectedFilters.asObservable();

 constructor() {

 }
 updateSelectedData(data: any) {
 this.selectedFilters.next(data)
 }
}