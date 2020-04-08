import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private _loginUrl="xyz";

  constructor(private http:HttpClient) { }

// loginUser(user){
//   return this.http.post<any>(this._loginUrl,user);
// }


loggedIn(){
  console.log("logged in function called in authservice",!!sessionStorage.getItem('token'));
  console.log("localStorage.getItem=====",sessionStorage.getItem('token'));
  return !!sessionStorage.getItem('token');
}

}
