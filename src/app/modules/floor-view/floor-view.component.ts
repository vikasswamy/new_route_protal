import { Component, OnInit, AfterViewInit,ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as mapboxgl from "mapbox-gl";
import {FormControl} from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, startWith } from 'rxjs/operators';

export interface State {
         Id: any;
          RouteId: any;
          Area: any;
          AreaDescription: any;
          ScopeOfWork: any;
          StartTime:any;
          EndTime: any;
          StartTime_Raw: any;
          EndTime_Raw: any;
          Duration:any;
          RoomNumber:any;
          Floor: any;
          CleaningType:any;
          IsArchived: any;
          IsAcknowledged: any;
          Type: any;
          RouteName:any;
          CreatedOn:any;
          AssignedTo: any;
          Shift: any;
          TaskOrder: any;
          IsAssigned: any;
          Priority:any;
          PreferredStaff:any;
          SpaceType:any;
          
  
}
@Component({
  selector: 'app-floor-view',
  templateUrl: './floor-view.component.html',
  styleUrls: ['./floor-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FloorViewComponent implements OnInit,AfterViewInit {
  levelName: any = [];
  markerData:any = [];
  map: any;
  roomsData: any = [];
  routedata:any= {
    type: 'FeatureCollection',
    features: []
  };
  Spaceheatmap:any={
    type: 'FeatureCollection',
    features: [

    ]
  }
  destinations:any={
    type: 'FeatureCollection',
    features: [

    ]
  }
  stateCtrl = new FormControl();

  indoordate:any;
  notFound: boolean;
  mapShow: boolean;
  sub_arr: any [];
  totalTasks: any =[];
  states: State[]=[];
  filteredStates: Observable<State[]>;
  @ViewChild("autoInput") input:any;
  selectedstaffdetails: any='';
  NameofStaff: any='';
  centroidData: any = [];
  selectedDestinationId: any =[];
  selectedSpaceId: any="02C5226E-764C-4DED-8FC9-3A6ABC3AD665";
  sortingarra:any=[];

  constructor(
    private http: HttpClient,
   
  ){
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this._filterStates(state) : this.states.slice()))
    );
  }
  ngOnInit(): void {
    this.mapLoadingData();
    
  }
  
  ngAfterViewInit() {}
  mapInformation() {
    (mapboxgl as typeof mapboxgl).accessToken = "pk.eyJ1IjoidmlrYXMtc3dhbXkiLCJhIjoiY2t3eWticmc1MG5yZjM0cXR3czBheDMyeCJ9.ROb_2S1Qd_47JhnT_x6xMQ";
    this.levelName = null;
    this.markerData = [];
    this.map='';
   // var document =Document;
   var centerpoint:any= environment.tustin_centerPoint;
    (document.getElementById('view-mapbox') as HTMLElement).innerHTML=''
    this.map = new mapboxgl.Map({
      container: "view-mapbox",
      style: "mapbox://styles/vikas-swamy/cl8l7gdnp000h15mxq4a6d1m0",
      center: centerpoint,
      zoom: 19,
      pitch: 0,
      bearing: 383,
     
    });
    
    var popup: any = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,
    });

    this.map.on("load", (e:any) => {
      //console.log(this.routedata)

      this.map.addLayer({
        id: "normal",
        type: "line",
        source: {
          type: "geojson",
          data: this.roomsData,

        },

        paint: {
          "line-color": "white",
          "line-width": 1,
        },
      });
      if(this.Spaceheatmap.features.length>0){
        this.map.addLayer({
          id: 'maine',
          type: 'fill',
          source: {
            type: "geojson",
            data: this.Spaceheatmap,
  
          }, // reference the data source
          'layout': {},
          'paint': {
            "fill-color": ["get", "colour"],          
            "fill-opacity": 0.5,
          
          }
          })
      }
      
      if(this.routedata.features.length>0){
        
        
       this.map.addLayer( {
        id: 'LineString',
        type: 'line',
         source: {
          type: "geojson",
          data: this.routedata,
        
        },
        layout: {
        'line-join': 'round',
        'line-cap': 'round'
        },
        paint: {
        'line-color': '#FFAB40',
        'line-width': 5
        }
        });
      
        // this.map.loadImage(
        //   'https://storagesmartroute27.blob.core.windows.net/geojson/Brookfield/icons8-footprint-48.png',
        //   (error, image) => {
        //     if (error) throw error;
        //     this.map.addImage('custom-marker', image);
        //     this.map.addLayer(
        //       {
        //         id: 'routearrows',
        //         type: 'symbol',
        //         source: {
        //           type: "geojson",
        //           data: this.routedata,
                
        //         },
        //         layout: {
        //          'icon-image': 'custom-marker',
        //           'symbol-placement': 'line',
        //           //'text-field': '▶',
        //           'text-size': [
        //             'interpolate',
        //             ['linear'],
        //             ['zoom'],
        //             2,
        //             14,
        //             22,
        //             60
        //           ],
        //           'symbol-spacing': [
        //             'interpolate',
        //             ['linear'],
        //             ['zoom'],
        //             2,
        //             10,
        //             15,
        //             30
        //           ],
        //           'text-keep-upright': false
        //         },
        //         paint: {
        //           'text-color': '#3887be',
        //           'text-halo-color': 'hsl(55, 11%, 96%)',
        //           'text-halo-width': 3
        //         }
        //       },
              
        //     );
        //   })
       

          
         
          for ( let i=0; i<= this.routedata.features.length; i++) {
           console.log(this.routedata.features,'line 209')
          
           
            const el = document.createElement('div');
            // const width = marker.properties.iconSize[0];
            // const height = marker.properties.iconSize[1];
            el.className = 'marker';
            el.id= this.routedata.features[i].properties.To     
            el.innerHTML =`<style> 
            .pin {
              width: 30px;
              height: 30px;
              border-radius: 50% 50% 50% 0;
              border: 4px solid #FFAB40;
              transform: rotate(-45deg);
              color: white;
              display: flex;
              background-color: #FFAB40;
              justify-content: center;
              align-items: center;
            }
            .pin span {
              transform: rotate(45deg);
            }
    
    
            </style>
            <div class='pin'><span>${i+1}</span></div>
          
            `
         
            new mapboxgl.Marker(el).setOffset([1, -12])
                .setLngLat(this.routedata.features[i].geometry.coordinates[this.routedata.features[i].geometry.coordinates.length-1])
                .addTo(this.map);

                  this.centroidData.features.forEach((items:any,index:any)=>{
                    var spaceids= items.properties.SpaceId.toUpperCase()
                    
                    if(String(this.routedata.features[i].properties.To)== String(spaceids)){
                      let value =Math.floor(Math.random() * (50 - 35 + 1) + 35)  ;
                      let fill = ((value/100)*360)/2;
                      console.log(fill,'rotation')
                      //this.destinations.features.push(this.centroidData.features[index])
                      const pCircle = document.createElement('div');
                      pCircle.className = this.centroidData.features[index].properties.SpaceId.toUpperCase();
                      pCircle.style.visibility="hidden"
                      pCircle.innerHTML=`
                      <style>
                      .circle-wrap {
                        margin: 37.5px auto;
                        width: 37.5px;
                        height: 37.5px;
                        background: #fefcff;
                        border-radius: 50%;
                        border: 1px solid #cdcbd0;
                    }
                    
                    .circle-wrap .circle .mask,
                    .circle-wrap .circle .fill {
                        width: 37.5px;
                        height: 37.5px;
                        position: absolute;
                        border-radius: 50%;
                    }
                    
                    .circle-wrap .circle .mask {
                      clip: rect(0px, 37.5px, 37.5px, 18.75px);
                    }
                    
                    .circle-wrap .inside-circle {
                      width: 30.5px;
                      height: 30.5px;
                      border-radius: 50%;
                      background: #9585ca;
                      line-height: 30px;
                      text-align: center;
                      margin-top: 3.5px;
                      margin-left: 3.5px;
                      color: white;
                      position: absolute;
                      z-index: 100;
                      font-weight: 800;
                      font-size: 1em;
                    }
                    .min-circle{
                      
                      width: 30.5px;
                      height: 30.5px;
                      border-radius: 50%;
                      background: transparent;
                      line-height: 37.5px;
                      text-align: center;
                      margin-top: 8px;
                      margin-left: 3.5px;
                      color: white;
                      position: absolute;
                      z-index: 100;
                      font-weight: 500;
                      font-size: 0.7em;
                    }
                    
                    .mask .fill {
                      clip: rect(0px, 18.75px, 37.5px, 0px);
                      background-color: #22ed4e;
                    }
                    
                    .mask.full,
                    .circle .fill {
                      animation: fill ease-in-out 3s;
                        transform: rotate(${fill}deg);
                    }
                      </style>
                      <div class="circle-wrap">
                      <div class="circle">
                        <div class="mask full">
                          <div class="fill"></div>
                        </div>
                        <div class="mask half">
                          <div class="fill"></div>
                        </div>
                        <div class="inside-circle"> ${value}  </div>
                        <span class="min-circle"> Mnts </span>
                      </div>
                    </div>`
                    new mapboxgl.Marker(pCircle).setOffset([1, -12])
                .setLngLat(this.centroidData.features[index].geometry.coordinates)
                .addTo(this.map);
                console.log(this.centroidData.features[index].geometry,"inside.....")
                    }
                  })
                  el.addEventListener("mouseenter", (e:any) => {
                    let div= e.target as HTMLElement
                    (document.getElementsByClassName(`${div.getAttribute("id")}`)[0] as HTMLElement).style.visibility="visible";
                    console.log((document.getElementsByClassName(`${div.getAttribute("id")}`)[0] as HTMLElement),"hovered marker id")
                  })
                  el.addEventListener("mouseleave", (e:any) => {
                    let div= e.target as HTMLElement
                    (document.getElementsByClassName(`${div.getAttribute("id")}`)[0] as HTMLElement).style.visibility="hidden";
                    console.log((document.getElementsByClassName(`${div.getAttribute("id")}`)[0] as HTMLElement),"hovered marker id")
                  })
        }
        
        
    
            

      }
      this.map("mouseenter", "LineString",(e:any)=>{
        this.map.getCanvas().style.cursor = "pointer";
            console.log(e.features[0].properties)     
           var coordinates = e.features[0].geometry.coordinates.slice();
        var Distance = Number(e.features[0].properties.Distance)*1000;
        var h2 = document.createElement("strong");
        h2.style.color = "black";
        h2.style.width = "auto";
        h2.innerHTML = `<div style="display: grid; grid-template-columns: repeat(1,1fr);grid-gap: 2px;align-items: center; ">
        <div style="border-radius: 10px;background: #fff;padding: 0 10px;background-color: #00853e;color: #fff;"><strong>${Distance}: mts</strong></div>
        </div>`;
        popup.setLngLat(coordinates)
        .setDOMContent(h2)
        .addTo(this.map);
      })
      
     
    //  this.map.on("mouseleave", "LineString", function (e:any) {
    //        this.map.getCanvas().style.cursor = "";

    //   });
     

    });
  }
  mapLoadingData() {
    this.getRoomsData();
    this.http.get("https://storagesmartroute27.blob.core.windows.net/3d-geojson/Tustin/Sample_Route.geojson").subscribe((response:any) => {
     response.features.forEach((element:any)=>{
      if (
        element.properties.From != null &&
        element.properties.To != null
      ) { 
        element.properties.From = element.properties.From.toUpperCase()
        element.properties.To = element.properties.To.toUpperCase()
        element.properties.Distance= parseFloat(element.properties.Distance)*1000
      }
     })
     console.log(response, "line 279 indoor data")
     this.indoordate=response
  })
    this.getstaffTasks();
  
  
  }
  getstaffTasks(){
    this.http.get("https://storagesmartroute27.blob.core.windows.net/3d-geojson/tasks_responce.json").subscribe((resp:any) => {
       resp.data.Tasks.forEach((element:any) => {
     
        element.ScopeOfWork= element.AssignedTo.split("@")[0]
      });
      let data =  resp.data.Tasks;
      this.totalTasks = data;
      console.log(this.totalTasks,":::: total tasks")
      this.states = this.totalTasks;
      // this.filteredStates = of(this.options);
      //console.log(this.filteredOptions$,"::filterde options")
    })
  }
  private _filterStates(value: any): State[] {
    const filterValue = value;
    this.selectedstaffdetails = value;
    console.log(filterValue)
    this.NameofStaff=value.split("@")[0]
    this.gettasks();
    return this.states.filter(
      (state) => state.AssignedTo.indexOf(filterValue) === 0
    );
  }
  // changeRouteId() {
    
  //   //this.getRouteTasks();
  //   // this.GetTasks();
  //  // document.getElementById("cart-items").innerHTML = "";
  // }

  optimize(event:any){
    // console.log(event)
     if(this.sortingarra.length>0){
       this.selectedDestinationId=[];
       //console.log(this.sortingarra);
       this.sortingarra.forEach((itm:any,index:any)=>{
        // console.log(itm,',.......');
         this.centroidData.features.forEach((item:any,index:any)=>{
             
           if(String(item.properties.SourceSystemId) === String(itm)){
            // console.log(index,'matched features @' + itm)
             this.selectedDestinationId.push(this.centroidData.features[index].properties.SpaceId)
           }
          });
       })
       if(this.selectedDestinationId.length>0){
        // console.log(this.selectedDestinationId,'total destinartion')
         this.optimizedroute()
       }
     }
   }
   optimizedroute() {
     
     this.routedata.features=[];
     this.selectedSpaceId="02C5226E-764C-4DED-8FC9-3A6ABC3AD665";
     const rebuild=()=>{
       var sampledata:any =[];
      // console.log(String(this.selectedSpaceId),this.selectedDestinationId,'line 515')
       if(this.selectedSpaceId!=null && this.selectedDestinationId.length>0){
         this.selectedDestinationId.forEach((item:any) => {
             this.indoordate.features.forEach((ele:any,k:any)=>{
               
               
                 if(String(this.selectedSpaceId) == String(ele.properties.From) && String(item) == ele.properties.To){
                  // console.log(this.indoordate.features[k],`if ${k}`)
                   sampledata.push(this.indoordate.features[k])
                   
                   
                 }
                 // else if(this.selectedSpaceId == ele.properties.To && String(item) == ele.properties.From ){
                 //   sampledata.push(this.indoordate.features[k])
                 //   console.log(this.indoordate.features[k],`else if ${k}`)
                   
                 // }
               });
              // console.log(this.centroidData,"centroid data")
        
           
         })
         // sampledata=sampledata.sort((a, b) => {
         //   if (a.properties.Distance < b.properties.Distance) {
         //     return -1;
         //   }
         // });
 
         this.selectedSpaceId = sampledata[0].properties.To; //(y:any)=> y.SpaceId !
         this.selectedDestinationId= this.selectedDestinationId.filter((y:any)=>  y != sampledata[0].properties.To );
        // console.log(this.selectedDestinationId,"after removing one item from destination ")
         this.routedata.features.push(sampledata.shift());
        // console.log(sampledata,"after Shift()")
         
       }
       
     if(this.selectedDestinationId.length >= 1){
      // console.log(this.selectedDestinationId)
       rebuild();
     }else {
       this.mapInformation()
     }
     }
   
     if(this.selectedDestinationId.length >0 ){
       rebuild();
     }
     
   
   }

  gettasks(){
    var ul = (document.getElementById("accordion__container") as HTMLElement);
    var smallcards = (document.getElementById("state-legend")as HTMLElement);
    smallcards.innerHTML='';
    ul.innerHTML='';
    var arr:any=[]
    this.http.get("https://storagesmartroute27.blob.core.windows.net/3d-geojson/tasks_responce.json").subscribe((resp:any) => {
    // console.log(resp,'staff tasks api resp');
    arr= resp.data.Tasks;
    let staffname = this.selectedstaffdetails;
    // console.log(arr)
    if (arr && arr.length > 0 ) {
      arr.forEach((elements:any,j:any) => {
        var cartdata = document.getElementsByClassName("accordion__container")[0];
        var cartItemNames = cartdata.getElementsByClassName('accordion__item') as HTMLCollectionOf<HTMLElement>;
        if(staffname == elements.AssignedTo){
          // console.log(j)
          this.centroidData.features.forEach((item:any,index:any)=>{
            
            if(String(item.properties.SourceSystemId) === String(arr[j].RoomNumber)){
              // console.log(index,'matched features @' + arr[j])
              this.selectedDestinationId.push(this.centroidData.features[index].properties.SpaceId)
            }
           });
           //for (var i = 0; i < cartItemNames.length; i++) {}
           var li = document.createElement("div");
           var ptag =document.createElement("p");
           ptag.innerHTML=`
           <style>
           .draggable {
            padding: 10px;
            font-size: 12px;
            height: auto;
            width: auto;
            position: relative;
            border-radius: 5px;
            border-color : none;
            color: white;
            background-color:  #2d3436;
           
            cursor: move;
          }
          
          .draggable.dragging {
            opacity: .5;
          }
           </style>
           
           <p id=${arr[j].RoomNumber} class="draggable" draggable="true">${ arr[j].Area}</p>`;
           
           li.innerHTML=`  
            <style>           
    .accordion__container {
      display: grid;
      row-gap: .75rem;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 0.5rem 0.2rem;
      background-color: transparent;
      border-radius: .5rem;
      box-shadow: 0 12px 32px rgba(51, 51, 51, 0.1);
    }
    
    .accordion__title {
      font-size: 15px;
      color: white;
      margin-top: .15rem;
      transition: .2s;
    }
    
    .accordion__header {
      display: flex;
      column-gap: .5rem;
      padding: 0.25rem ;
      cursor: pointer;
    }
    
    .accordion__description {
      padding: 0 0.25rem 0.25rem 1rem;
      font-size: 10;
      color: white;
    }
    .accordion__item {
      box-shadow: 0 2px 6px rgba(38, 38, 38, 0.1);
      background-color:  #00000063;
      padding: 5px;
      border-radius: 0.25rem;
      position: relative;
      transition: all 0.25s ease;
    }
    
    .accordion__item::after {
      content: '';
      background-color: rgb(23, 23, 23);
      width: 5px;
      height: 100%;
      position: relative;
      top: 0;
      left: 0;
      border-radius: .25rem 0 0 .25rem;
    }
    
   
    
    .accordion__content {
      overflow: hidden;
      height: 0;
      transition: all .25s ease;
    }
    
    /*Rotate icon and add font weight to titles*/
    .accordion-open .accordion__icon {
      transform: rotate(45deg);
    }
    
    .accordion-open .accordion__title {
    //  font-weight: 500;
     color: grey;
    }
    
    @media screen and (min-width: 100%) {
      .accordion__container {
        width: 100%;
        padding: 0.2rem;
        justify-self: center;
        border-radius: .75rem;
      }
      .accordion__header {
        padding: 0.5rem;
      }
      .accordion__title {
        padding-right: .5rem;
      }
      .accordion__description {
        padding: .5rem;
      }
    }
    
    @media screen and (min-width: 100%) {
      .container {
        margin-left: auto;
        margin-right: auto;
      }
    }
           </style>
           <div class="accordion__item">
           <div class="accordion__header">
                                                        
           <h3 class="accordion__title"">${ arr[j].Area}</h3>
       </div>

       <div  class="accordion__content">
           <p id = ${arr[j].RoomNumber} class="accordion__description">
           
           Assigne To = ${arr[j].AssignedTo.split("@")[0]+ '<br>'}
           
           Duration = ${arr[j].Duration}
           
           </p>
       </div>
       </div>
       `
       ul.appendChild(li)
       smallcards.appendChild(ptag)
    //        var ul = document.createElement('div');
    //        ul.className = "accordion__item";
    //        ul.innerHTML = `
       
        }
      
       /// li.appendChild(ul);
    })
    

    const accordionItems = document.querySelectorAll('.accordion__item')

    // 1. Selecionar cada item
    accordionItems.forEach((item) =>{
        const accordionHeader = item.querySelector('.accordion__header') as HTMLElement
    
        // 2. Seleccionar cada click del header
        accordionHeader.addEventListener('click', () =>{
            // 7. Crear la variable
            const openItem = document.querySelector('.accordion-open')
            
            // 5. Llamar a la funcion toggle item
            toggleItem(item)
    
            // 8. Validar si existe la clase
            if(openItem && openItem!== item){
                toggleItem(openItem)
            }
        })
    })
    
    // 3. Crear una funcion tipo constante
    const toggleItem = (item:any) =>{
        // 3.1 Crear la variable
        const accordionContent = item.querySelector('.accordion__content')
    
        // 6. Si existe otro elemento que contenga la clase accorion-open que remueva su clase
        if(item.classList.contains('accordion-open')){
            accordionContent.removeAttribute('style')
            item.classList.remove('accordion-open')
        }else{
            // 4. Agregar el height maximo del content
            accordionContent.style.height = accordionContent.scrollHeight + 'px'
            item.classList.add('accordion-open')
        }
    }

    const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.legend')
const accordion__content =document.querySelectorAll('.accordion__content')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
    draggables.forEach((item,i)=>{
      // console.log(item.id)
      // console.log(i);
    })
    
  })
})

containers.forEach((container,i) => {
  function dragover (e:any){
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    var draggable = document.querySelector('.dragging') as HTMLElement;
    if (afterElement == null) {
      
      container.appendChild(draggable)
    } else {
      
    /// console.log(e.target.innerHTML,"innerhtml")
      container.insertBefore(draggable, afterElement)
    }
  }
  container.addEventListener('dragover', dragover);
  
})
var sortedarr:any=[];
var self:any=this;
function getDragAfterElement(container:any, y:any) {
  sortedarr=[];
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
  const sorteditems =[...container.querySelectorAll('.draggable')]
  sorteditems.forEach(itms=>{
    sortedarr.push(itms.id)
    
  })
  //console.log(sortedarr,"sortedarr")
  self.sortingarra=sortedarr
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
    
  }, { offset: Number.NEGATIVE_INFINITY }).element
  
}

     }
     if(this.selectedDestinationId.length>0){
      //console.log(this.selectedDestinationId,'total destinartion')
      this.getroute()
    }
})
  }

  getroute() {
    
    this.routedata.features=[];
    this.destinations.features=[];
    this.selectedSpaceId="02C5226E-764C-4DED-8FC9-3A6ABC3AD665"
    const rebuild=()=>{
      var sampledata:any =[];
     // console.log(String(this.selectedSpaceId),this.selectedDestinationId,'line 515')
      if(this.selectedSpaceId!=null && this.selectedDestinationId.length>0){
        this.selectedDestinationId.forEach((item:any) => {
            this.indoordate.features.forEach((ele:any,k:any)=>{
              
              
                if(String(this.selectedSpaceId) == String(ele.properties.From) && String(item) == ele.properties.To){
                  //console.log(this.indoordate.features[k],`if ${k}`)
                  sampledata.push(this.indoordate.features[k])
                  
                  
                }
                // else if(this.selectedSpaceId == ele.properties.To && String(item) == ele.properties.From ){
                //   sampledata.push(this.indoordate.features[k])
                //   console.log(this.indoordate.features[k],`else if ${k}`)
                  
                // }
              });
         
         
            
        })
        sampledata=sampledata.sort((a:any,b:any) => {
          if (a.properties.Distance < b.properties.Distance) {
            return -1;
          }
        });

        this.selectedSpaceId = sampledata[0].properties.To; //(y:any)=> y.SpaceId !
        this.selectedDestinationId= this.selectedDestinationId.filter((y:any)=>  y != sampledata[0].properties.To );
        this.routedata.features.push(sampledata.shift());
        
      }
      
    if(this.selectedDestinationId.length >= 1){
      rebuild();
    }else {
      this.mapInformation()
    }
    }
  
    if(this.selectedDestinationId.length >0 ){
      rebuild();
    }
    
  
  }

  getRoomsData() {
          this.Spaceheatmap.features=[]
        this.http.get(environment.tustin_First_floor_geojson).subscribe((response: any) => {
          if (response && !response.features) {
            this.notFound = true;
            this.mapShow = false;
          } else {
            response.features.forEach((element:any) => {
              if (
                element.properties != null ||
                element.properties != undefined
              ) {
                if (
                  element.properties.height != null ||
                  element.properties.height != "Undefined"
                ) {
                  element.properties.height = parseFloat(
                    element.properties.height
                  );
                }
                if (
                  element.properties.Base_height != null ||
                  element.properties.Base_height != "Undefined"
                ) {
                  element.properties.Base_height = parseFloat(
                    element.properties.Base_height
                  );
                }
                
              }
            });
            this.notFound = false;
            this.sub_arr = [];
            this.roomsData = response;


            if (this.roomsData.length != 0) {
              this.getCentroidData();
            }
            response.features.forEach((element:any,ind:any) => {
              element.properties.colour = null;
              if (
                element.properties.Space != null 
              ) {
                
                if(response.features[ind].properties.SourceSystemId == "dfe2ec1357e7"  ){
                  response.features[ind].properties.colour= "green"
                }else if(response.features[ind].properties.SourceSystemId == "dde673b87776"){
                  response.features[ind].properties.colour= "red"
                }else if(response.features[ind].properties.SourceSystemId == "fd11e137532a"){
                  response.features[ind].properties.colour= "orange"
                }
                if(response.features[ind].properties.colour != null){
                  this.Spaceheatmap.features.push(response.features[ind])
                }
                
              }
            })
            console.log(this.Spaceheatmap, '::: spaces floors polygons')
          }
        });
      
  }
  getCentroidData() {
    
        this.http.get(environment.tustin_firstFloor_centroid).subscribe((response: any) => {
          if (response && !response.features) {
            this.notFound = true;
            this.mapShow = false;
          } else {
            this.mapShow = true;
            this.notFound = false;
             //   console.log(response,"centroid data......>")
            response.features.forEach((element: any) => {
              if (
                element.properties.SpaceId != null &&
                element.properties.SpaceId != "Undefined"
              ) {
                element.properties.SpaceId =
                  element.properties.SpaceId.toUpperCase();
              }
            });
            this.centroidData = response;
            if (this.centroidData.length != 0) {
              
              this.mapInformation();
              // this.mapCountdata();
              // document.getElementById("timeline-wrapper").innerHTML = "";
              // (<HTMLButtonElement>(
              //   document.getElementById("task_submits")
              // )).disabled = true;
              // document.querySelector('#sel').innerHTML="";
            }
          }
        });
     
    
  }


}
