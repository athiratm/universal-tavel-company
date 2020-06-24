import { Injectable } from '@angular/core';
import * as moment from "moment";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
  	private router: Router,
  	private http: HttpClient) {
    }
      
    login(email:string, password:string ) {

        console.log("inside login");
      //  return this.http.post<any>('http://reqres.in/api/login', {'userName':email,'password': password})
     let token = this.http.post("http://localhost:8081/authenticate",{'userName':email,'password': password},{responseType:'text' as 'json'});
     token.subscribe(data=>{
         console.log("token :"+data);
         var strTkn = 'Bearer '+data
         console.log("strTkn:"+strTkn);
         this.setSession(strTkn);
         this.router.navigate(['']);
        });
     
     
    
    
    }
    private setSession(authResult) {
        const expiresIn = 60*60;
        const expiresAt = moment().add(expiresIn,'second');

        localStorage.setItem('id_token', authResult);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          
    public getStrToken(){
        var token = localStorage.getItem("id_token");
        return token;
    }
    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public checkAuthenticated() {
    	var exp = localStorage.getItem("expires_at");
        if(exp)
        return moment().isBefore(this.getExpiration());
        else{
        return false;
        }
    }

    isLoggedOut() {
        return !this.checkAuthenticated();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}
