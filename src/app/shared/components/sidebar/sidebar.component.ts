import { Component } from '@angular/core';
import { SidebarService } from 'src/app/service/sidebar.service';
import { TaskEditService } from 'src/app/service/taskedit.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  public checkedarray = [];     
  public selectedRouteIds: any[] = [];
  public shiftSelectedValue: any;
  public floorSelectedValue: any;
  public shifts = [
    {value: 'morning', title: 'MORNING'},
    {value: 'afternoon', title: 'AFTERNOON'},
    {value: 'evening', title: 'EVENING'},
  ];

  public floors = [
    {value: '1', title: '1st floor'},
    {value: '2', title: '2nd floor'},
    {value: '3', title: '3rd floor'},
    {value: '4', title: '4th floor'},
  ];

  public routes = [
    {value:'444',  title:'Am Restroom ID 444', checked: false},
    {value:'2356', title:'Lobby ID 2356', checked: false},
    {value:'3950', title:'First Floor ID 3950', checked: false},
    {value:'24862',title:'Mezzanine ID 24862', checked: false},
    {value:'3959',title:'econd Floor ID 3959', checked: false},
    {value:'26664',title:'Balcony ID 26664', checked: false},
    {value:'23555',title:'Balcony ID 23555', checked: false}
  ];
  constructor(public sidebarservice: SidebarService, public taskEditService: TaskEditService) {
  }

  ngOnInit() {
    this.getShifts();
    this.getFloors();
    this.getRoutes();
  }

  clearFilters(parm1: any, param2: any)
  {
    this.selectedRouteIds = [];
    parm1.value = undefined;
    param2.value = undefined;
    this.routes.forEach(item => {
       item.checked = false;
    })
    //this.routeselected = undefined;this
  }

  getShifts() {
    this.sidebarservice.getShiftsList().subscribe(data => {
       console.log(data);
       //this.shifts = data.
    })
  }

  getFloors() {
    this.sidebarservice.getFloorsList().subscribe(data => {
       console.log(data);
      // this.floors = data.
    })
  }

  getRoutes() {
    this.sidebarservice.getroutesList().subscribe(data => {
       console.log(data);
      // this.routes = data.
    })
  }

  routeselectedvalues(event: string) {
    debugger;
    console.log(this.selectedRouteIds.includes(event));
    if(this.selectedRouteIds.includes(event))
    {
      let index = this.selectedRouteIds.indexOf(event);
      if (index > -1) {
        this.selectedRouteIds.splice(index, 1);
      }
    }
    else {
      this.selectedRouteIds.push(event);
    }
    this.getShiftandFloorSelectedValues(this.shiftSelectedValue, this.floorSelectedValue);
  }

  getShiftandFloorSelectedValues(shiftSelectdValue: any, floorSelectedValue: any) {
    debugger;
    this.taskEditService.updateSelectedData(this.floors);
     this.shiftSelectedValue = shiftSelectdValue;
     this.floorSelectedValue = floorSelectedValue;
     if(this.shiftSelectedValue == undefined) {
      this.shiftSelectedValue = "";
     }
     if(this.floorSelectedValue == undefined) {
        this.floorSelectedValue = "";
     }
      const filterData = {
           shift:this.shiftSelectedValue,
           floor:this.floorSelectedValue,
           route:this.selectedRouteIds
     }
     this.sidebarservice.getTeamMemberAvailability(filterData).subscribe(data => {
         console.log(data);
        
     })
  }
}