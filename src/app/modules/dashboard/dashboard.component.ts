import { Component, OnInit } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { DashboardService } from "src/app/service/dashboard.service";
export interface availableMembers {
  id: number;
  name: string;
  alocatedTime: string;
  isAvailability: boolean;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  timeallocatedforroute = 530;
  requiredtime = 600;
  unassaignedTask = 6;
  color = "green";
  checked = true;
  disabled = false;
  availableMemberCtrl = new FormControl("");
  filteredAvailableMembers: Observable<availableMembers[]>;
  startedletters: string;
  halfdata: number;
  leftSideSwitch: any;
  rightSideSwitch: any;
  isAvailability: boolean;
  mergedArray: [];
  startedetters: string;

  ELEMENT_DATA_LEFT: availableMembers[] = [
    { id: 1, name: "Adam Usher", alocatedTime: "100", isAvailability: true },
    { id: 2, name: "Adrian Solaris", alocatedTime: "40", isAvailability: true },
    { id: 3, name: "Andrew Brady", alocatedTime: "100", isAvailability: true },
    { id: 4, name: "Carl Jordan", alocatedTime: "100", isAvailability: true },
    { id: 5, name: "Dany Vincent", alocatedTime: "100", isAvailability: true },

    {
      id: 6,
      name: "Ferdinand Addams",
      alocatedTime: "100",
      isAvailability: true,
    },

    {
      id: 7,
      name: "George Mcartney",
      alocatedTime: "100",
      isAvailability: true,
    },

    {
      id: 8,
      name: "Michael Sulley",
      alocatedTime: "100",
      isAvailability: true,
    },

    { id: 9, name: "Tim Ally", alocatedTime: "50", isAvailability: true },

    {
      id: 10,
      name: "Amber Jackson",
      alocatedTime: "100",
      isAvailability: true,
    },

    { id: 11, name: "Anna Usof", alocatedTime: "100", isAvailability: true },
    { id: 12, name: "Allen Smith", alocatedTime: "40", isAvailability: true },
    { id: 13, name: "Andrea Boggs", alocatedTime: "100", isAvailability: true },
    { id: 14, name: "Chanel John", alocatedTime: "70", isAvailability: true },

    {
      id: 15,
      name: "Darell Victor",
      alocatedTime: "100",
      isAvailability: true,
    },

    {
      id: 16,
      name: "Farrah Anthonius",
      alocatedTime: "100",
      isAvailability: true,
    },

    {
      id: 17,
      name: "Garry Morello",
      alocatedTime: "100",
      isAvailability: true,
    },

    { id: 18, name: "Meyers Sams", alocatedTime: "100", isAvailability: true },
    { id: 19, name: "Tilly Addams", alocatedTime: "50", isAvailability: true },
    { id: 20, name: "Athkins Jane", alocatedTime: "100", isAvailability: true },
    // { id: 21, name: "Athkins Jane", alocatedTime: "100", isAvailability: true },
    { id: 21, name: "Adam Usher", alocatedTime: "100", isAvailability: true },
    {
      id: 22,
      name: "Adrian Solaris",
      alocatedTime: "40",
      isAvailability: true,
    },
    { id: 23, name: "Andrew Brady", alocatedTime: "100", isAvailability: true },
    { id: 24, name: "Carl Jordan", alocatedTime: "100", isAvailability: true },
    { id: 25, name: "Dany Vincent", alocatedTime: "100", isAvailability: true },
    { id: 26, name: "Adam Usher", alocatedTime: "100", isAvailability: true },
    {
      id: 27,
      name: "Adrian Solaris",
      alocatedTime: "40",
      isAvailability: true,
    },
    { id: 28, name: "Andrew Brady", alocatedTime: "100", isAvailability: true },
    { id: 29, name: "Carl Jordan", alocatedTime: "100", isAvailability: true },
    { id: 30, name: "Dany Vincent", alocatedTime: "100", isAvailability: true },
  ];

  ELEMENT_DATA_RIGHT: availableMembers[] = [
    { id: 1, name: "Adam Usher", alocatedTime: "100", isAvailability: true },
    { id: 2, name: "Adrian Solaris", alocatedTime: "40", isAvailability: true },
    { id: 3, name: "Andrew Brady", alocatedTime: "100", isAvailability: true },
    { id: 4, name: "Carl Jordan", alocatedTime: "100", isAvailability: true },
    { id: 5, name: "Dany Vincent", alocatedTime: "100", isAvailability: true },

    {
      id: 6,
      name: "Ferdinand Addams",
      alocatedTime: "100",
      isAvailability: true,
    },

    {
      id: 7,
      name: "George Mcartney",
      alocatedTime: "100",
      isAvailability: true,
    },

    {
      id: 8,
      name: "Michael Sulley",
      alocatedTime: "100",
      isAvailability: true,
    },

    { id: 9, name: "Tim Ally", alocatedTime: "50", isAvailability: true },

    {
      id: 10,
      name: "Amber Jackson",
      alocatedTime: "100",
      isAvailability: true,
    },

    { id: 11, name: "Anna Usof", alocatedTime: "100", isAvailability: true },
    { id: 12, name: "Allen Smith", alocatedTime: "40", isAvailability: true },
    { id: 13, name: "Andrea Boggs", alocatedTime: "100", isAvailability: true },
    { id: 14, name: "Chanel John", alocatedTime: "70", isAvailability: true },

    {
      id: 15,
      name: "Darell Victor",
      alocatedTime: "100",
      isAvailability: true,
    },

    {
      id: 16,
      name: "Farrah Anthonius",
      alocatedTime: "100",
      isAvailability: true,
    },

    {
      id: 17,
      name: "Garry Morello",
      alocatedTime: "100",
      isAvailability: true,
    },

    { id: 18, name: "Meyers Sams", alocatedTime: "100", isAvailability: true },
    { id: 19, name: "Tilly Addams", alocatedTime: "50", isAvailability: true },
    { id: 20, name: "Athkins Jane", alocatedTime: "100", isAvailability: true },
    { id: 21, name: "Adam Usher", alocatedTime: "100", isAvailability: true },
    {
      id: 22,
      name: "Adrian Solaris",
      alocatedTime: "40",
      isAvailability: true,
    },
    { id: 23, name: "Andrew Brady", alocatedTime: "100", isAvailability: true },
    { id: 24, name: "Carl Jordan", alocatedTime: "100", isAvailability: true },
    { id: 25, name: "Dany Vincent", alocatedTime: "100", isAvailability: true },
    { id: 26, name: "Adam Usher", alocatedTime: "100", isAvailability: true },
    {
      id: 27,
      name: "Adrian Solaris",
      alocatedTime: "40",
      isAvailability: true,
    },
    { id: 28, name: "Andrew Brady", alocatedTime: "100", isAvailability: true },
    { id: 29, name: "Carl Jordan", alocatedTime: "100", isAvailability: true },
    { id: 30, name: "Dany Vincent", alocatedTime: "100", isAvailability: true },
    // { id: 21, name: "Athkins Jane", alocatedTime: "100", isAvailability: true },
  ];

  constructor(public dashboardService: DashboardService) {}

  getFirstCharacters(str: string) {
    const arr = str.split(" ");
    this.startedetters = `${arr[0].charAt(0)} ${arr[1].charAt(0)}`;
    return this.startedetters;
  }

  public getcolor(alocateTime: any) {
    if (alocateTime < 50) {
      return "danger";
    } else if (alocateTime > 50) {
      return "success";
    } else if ((alocateTime = 50)) {
      return "warning";
    } else {
      return "danger;";
    }
  }

  ngOnInit() {
    this.getleftsidetabaleData();
    this.getRightSideTableData();
  }

  getLeftTableRowData(rowdata: any, checkedData: any) {
    this.dataSource.filteredData.forEach((leftData) => {
      if (rowdata.id == leftData.id) {
        leftData.isAvailability = checkedData.currentTarget.checked;
      }
    });
  }

  getRightTableRowData(rowdata: any, checkedData: any) {
    this.dataSourceright.filteredData.forEach((leftData) => {
      if (rowdata.id == leftData.id) {
        leftData.isAvailability = checkedData.currentTarget.checked;
      }
    });
  }

  getleftsidetabaleData() {
    let half = Math.ceil(this.ELEMENT_DATA_LEFT.length / 2);
    let leftSide = this.ELEMENT_DATA_LEFT.splice(0, half);
    //  alert(half);

    //  alert(JSON.stringify(leftSide));

    // alert(JSON.stringify(rightSide));
  }

  getRightSideTableData() {
    let half = Math.ceil(this.ELEMENT_DATA_RIGHT.length / 2);
    let rightSide = this.ELEMENT_DATA_RIGHT.splice(
      half,
      this.ELEMENT_DATA_RIGHT.length - half
    );

    // alert(JSON.stringify(rightSide))
  }

  displayedColumns: string[] = ["name", "alocatedTime"];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA_LEFT);
  dataSourceright = new MatTableDataSource(this.ELEMENT_DATA_RIGHT);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceright.filter = filterValue.trim().toLowerCase();
  }

  applyFilterRight(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceright.filter = filterValue.trim().toLowerCase();
  }

  confirmUpdate(leftdata: any, rightdata: any) {
    this.mergedArray = leftdata.filteredData.concat(rightdata.filteredData);
    this.dashboardService
      .updateMemberAvailabilityData(this.mergedArray)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
