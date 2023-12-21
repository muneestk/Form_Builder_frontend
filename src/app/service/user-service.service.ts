import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.develepment';
import { IFormBuilder } from '../interface/interface';

const httpOptions = {
  headers : new HttpHeaders({
    'content-Type' : 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userApiKey:string = environment.User_API_Key

  constructor(
    private _http:HttpClient
  ) { }

  registerFormBuilder(user:IFormBuilder):Observable<any>{
    return this._http.post(`${this.userApiKey}/register`,user,httpOptions)
  }

  loginFormBuilder(user:IFormBuilder):Observable<any>{
    return this._http.post(`${this.userApiKey}/login`,user,httpOptions)
  }


  
}
