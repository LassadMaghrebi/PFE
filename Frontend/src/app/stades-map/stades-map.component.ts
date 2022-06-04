import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-stades-map',
  templateUrl: './stades-map.component.html',
  styleUrls: ['./stades-map.component.scss']
})
export class StadesMapComponent implements OnInit {

  map!: mapboxgl.Map;
  
  lat = 33.34;
  lng = 10.49;
  stadeId=""
  constructor(private route:ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.stadeId=params.get('id')||""
    })

mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',()=>{});
}
  ngOnInit(): void {
    this.initializeMap()
    this.addMarker(10.491022,33.343434)
    this.getStades()
  }

  addMarker(lng:number,lat:number){
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML('<div><h1>title</h1></div>')
      const el = document.createElement('div');
      el.style.backgroundImage = `url("../../assets/Location1.svg")`;
      el.style.width ='30px';
      el.style.height ='40px';
      el.style.backgroundSize = '100%';
    new mapboxgl.Marker(el).setLngLat([lng,lat]).setPopup(popup).addTo(this.map)
  }

  initializeMap(){
    (mapboxgl as any).accessToken="pk.eyJ1IjoibGFzc2FkMSIsImEiOiJja252bXBkYWIwb2dwMnduanlvdzRibzE2In0.yYJ5l_HY_tJRiz1gCX-cWA"
    this.map = new mapboxgl.Map({
      container: 'map',
      style:'mapbox://styles/mapbox/streets-v11',
      zoom: 8,
      center: [this.lng, this.lat]
  })
    this.map.addControl(new mapboxgl.NavigationControl);
    this.map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {enableHighAccuracy: true},
      trackUserLocation: true,
      showUserHeading: true})
    )   
  }

  getStades(){
    if(this.stadeId){
      console.log(this.stadeId);
    }
  }
}
