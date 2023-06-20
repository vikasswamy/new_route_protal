import { Component,OnInit, AfterViewInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { environment } from 'src/app/environments/environment';
import * as mapboxgl from "mapbox-gl";
import * as maptalks from 'maptalks';
@Component({
  selector: 'app-building-view',
  templateUrl: './building-view.component.html',
  styleUrls: ['./building-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BuildingViewComponent  implements OnInit,AfterViewInit{
  dataSource:any = ELEMENT_DATA;
  columnsToDisplay = ['Name', 'Last_Name', 'Floor', 'Room', 'RouteID'];
  expandedElement: PeriodicElement | null;
   arr:any =[];
    polygons:any=[];
    centeroid:any=[];
  constructor(
    private http: HttpClient,
  ){

  }
  ngOnInit(): void {
    this.multiLevel();
  }
  
  ngAfterViewInit() {}

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  multiLevel(){
    var map :any=null ;
    let item = environment.tusti_allFloors_floor_geojson;
   
   this.http.get(String(item)).subscribe((response:any) => {
          
    if(response){
      Object.values(response).forEach((ele:any) => {
        Object.values(ele).forEach((items:any) => {
          items.features.forEach((item:any) => {
            
      if (item.properties != null || item.properties != undefined) {
        if (
          item.properties.height != null ||
          item.properties.height != "Undefined"
        ) {
          item.properties.height = parseFloat(item.properties.height);
        }
        if (
          item.properties.SpaceId == null ||
          item.properties.SpaceId == "Undefined"
        ) {
          item.properties.SpaceName =null;
        }
        if (
          item.properties.Base_height != null ||
          item.properties.Base_height != "Undefined"
        ) {
          item.properties.Base_height = parseFloat(item.properties.Base_height);
        }
        if( item.properties.Name != "Staircase" ){
            
            this.polygons.push(
              new maptalks.Polygon( item.geometry.coordinates[0][0], {
                visible: true,
          editable: true,
          cursor: 'pointer',
          draggable: false,
          dragShadow: false, // display a shadow during dragging
          drawOnAxis: null, // force dragging stick on a axis, can be: x, y
          symbol: {
            'lineColor': '#34495e',
            'lineWidth': 0.5,
            'polygonFill': item.properties.colour,
            'polygonOpacity': 0.6
          },
          properties: {
            id : item.properties.Level,
            altitude: item.properties.Level * 3,
          }
              }).on('click', function (e) {
                console.log(e.target.getProperties())
                e.target.updateSymbol({
                  'polygonFill' : '#f00'
                }).on('mouseout', function (e:any) {
                  //reset color
                  e.target.updateSymbol({
                    'polygonFill' : 'rgb(135,196,240)'
                  });
                })
              })
            )
          }else if( item.properties.Name != null &&
            item.properties.Name != "Undefined" &&item.properties.Name == "Staircase"){
              
              this.polygons.push(
                new maptalks.Polygon( item.geometry.coordinates[0][0], {
                  visible: true,
            editable: true,
            cursor: 'pointer',
            draggable: false,
            dragShadow: false, // display a shadow during dragging
            drawOnAxis: null, // force dragging stick on a axis, can be: x, y
            symbol: {
              'textFaceName': item.properties.SpaceName,
              'textFloor': 'bold',
              'textSize': 5,
              'textFill': '#1bbc9b',
              'textHaloFill': '#fff',
              'textHaloRadius': 5,
              'lineColor': '#34495e',
              'lineWidth': 0.5,
              'polygonFill': item.properties.colour,
              'polygonOpacity': 0.6
            },
            properties: {
              id : item.properties.Level,
              altitude: item.properties.height,
            }
                }).on('click', function (e:any) {
                  console.log(e.target.getProperties())
                  e.target.updateSymbol({
                    'polygonFill' : '#f00'
                  }).on('click', function (e:any) {
                    e.target.ge
                  })
                  
                  .on('mouseout', function (e:any) {
                    //reset color
                    e.target.updateSymbol({
                      'polygonFill' : 'rgb(135,196,240)'
                    });
                  })
                })
              )
            }
       
      }
            
          });
        })
        

      })
      var map = new maptalks.Map('mapa-mapbox', {
        center: [-117.80461182318, 33.72120860404],
        zoom: 20,
        pitch: 56,
        baseLayer: new maptalks.TileLayer('base', {
          urlTemplate: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
          subdomains: ["a", "b", "c", "d"],
          attribution: '© <a href="http://osm.org">OpenStreetMap</a>  contributors, © <a href="https://carto.com/">CARTO</a> '
        })
       
      });
      map.removeBaseLayer()
       new maptalks.VectorLayer('vector',this.centeroid, {
          enableAltitude: true
        }).addGeometry(this.polygons).addTo(map);
     
    
    }
  
   })
  }

}
export interface PeriodicElement {
  Name: string;
  Last_Name: string;
  Floor: number;
  Room : number;
  RouteID: string;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Last_Name: "JSON",
    Name: 'Henry',
    Floor: 1,
    Room : 7,
    RouteID: "1477RAM",
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic Floor of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    Last_Name: "Johnson",
    Name: 'Hemma',
    Floor: 1,
    Room : 13,
    RouteID: "1488RAM",
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    Last_Name: "John",
    Name: 'Lithium',
    Floor: 1,
    Room : 6,
    RouteID: "1476RAM",
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    Last_Name: "mike",
    Name: 'Beryllium',
    Floor: 1,
    Room : 17,
    RouteID: "1481RAM",
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    Last_Name: "finch",
    Name: 'Boron',
    Floor: 1,
    Room : 2,
    RouteID: "1472RAM",
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    Last_Name: "casi",
    Name: 'Anna',
    Floor: 1,
    Room : 3,
    RouteID: "1473RAM",
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    Last_Name: "Tyson",
    Name: 'Mike',
    Floor: 1,
    Room : 9,
    RouteID: "1472RAM",
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    Last_Name: "Luis",
    Name: 'Gamora',
    Floor: 1,
    Room : 8,
    RouteID: "1476RAM",
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    Last_Name: "Tony",
    Name: 'Fluorine',
    Floor: 1,
    Room : 19,
    RouteID: "1478RAM",
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    Last_Name: "joe",
    Name: 'Neon',
    Floor: 1,
    Room : 8,
    RouteID: "1478RAM",
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
  {
    Last_Name: "troy",
    Name: 'Neon',
    Floor: 1,
    symbol: 'Ne',
    Room : 7,
    RouteID: "1476RAM",
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
  {
    Last_Name: "lanister",
    Name: 'Tyron',
    Floor: 1,
    symbol: 'Ne',
    Room : 6,
    RouteID: "1477RAM",
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];
