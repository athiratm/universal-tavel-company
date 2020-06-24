import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { FlightData } from './models/FlightData';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {

  constructor(private http:HttpClient) { }

  public invokeGetFlights(request) {
    console.log("inside invokeGetFlights");
   // const headers = new HttpHeaders().set("Access-Control-Allow-Origin" , 'http://localhost:4200');
    return this.http.post<FlightData[]>("http://localhost:8081/flight/getFlights",request,{responseType:'text' as 'json'});
    
  }

}
