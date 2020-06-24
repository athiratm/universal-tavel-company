import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {AuthService} from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient,
     private authService:AuthService,
     private router: Router,) { }

  public invokeBooking(request) {

    console.log("inside booking");
    var token = this.authService.getStrToken();
    let authenticated = this.authService.checkAuthenticated();
    // if(!authenticated) {
    //   this.router.navigate(['login']);
    // } else {
      console.log("else");
      const headers = new HttpHeaders().set("Authorization" , token);
      this.http.post("http://localhost:8081/booking/createBooking",request,{headers,responseType:'text' as 'json'})
      .subscribe(data=>{
        console.log(data);
        this.router.navigate(['booking']);
      });
     
    //}
    
    
  }
}
