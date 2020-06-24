import { Component, OnInit } from '@angular/core';
import {FlightSearchService} from '../flight-search.service';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
import  {FlightData} from '../models/FlightData'
import { of } from 'rxjs';
import {MatDialog,MatDialogConfig} from '@angular/material';
import {DialogContentComponent} from '../dialog-content/dialog-content.component';
import {BookingService} from '../booking.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  bookingObj = {bookingDate:'',paxCount:'',flightNumber:''};
  seat = '';
  criteria = {departureAirport: '', arrivalAirport: '',departureDate: ''};

  constructor(private flightService : FlightSearchService,
    public dialog: MatDialog,
    private bookingService : BookingService) { }

  formattedDate = moment(this.criteria.departureDate).format('YYYY-MM-DD');
  dataSource : FlightData[];
  ngOnInit() {
  }
 
  showBookingDialog(flightId){
    console.log("showBookingDialog");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DialogContentComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.seat =result;
      console.log("seat"+this.seat + ""+flightId);
      this.bookingObj.bookingDate = moment(new Date()).format('YYYY-MM-DD');
      this.bookingObj.flightNumber = flightId;
      this.bookingObj.paxCount = this.seat;
      this.bookingService.invokeBooking(this.bookingObj);
    });
  }

  async searchFlights() {
    try{
      this.criteria.departureDate = moment(this.criteria.departureDate).format('YYYY-MM-DD')
   
     // console.log("departureDate : "+this.criteria.departureDate);
    //  console.log("moment ..."+moment(this.criteria.departureDate).format('YYYY-MM-DD'));
       this.flightService.invokeGetFlights(this.criteria).subscribe(
         flights=>{
           this.dataSource = (JSON.parse(flights.toString())) as FlightData[];
          }
       );
     

    }catch(err) {

    }
  }
  displayedColumns: string[] = ['position', 'operatingAirlines', 'departureAirport', 'arrivalAirport','seats','actionBook' ];
  
}


export interface PeriodicElement {
  operatingAirlines: string;
  departureAirport: string;
  arrivalAirport: string;
  
}
