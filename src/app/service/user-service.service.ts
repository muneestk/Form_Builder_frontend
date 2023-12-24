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

  saveForm(form:any,formName:any,id:string):Observable<any>{
    return this._http.post(`${this.userApiKey}/saveForm`,{form,formName,id},httpOptions)
  }

  getForms(id:string):Observable<any>{
    return this._http.get(`${this.userApiKey}/getForms/${id}`);
  }

  getSingleForm(id:string):Observable<any>{
    return this._http.get(`${this.userApiKey}/getSingleForm/${id}`);
  }

  registerForm(form:any,formId:string,formName:string):Observable<any>{
    return this._http.post(`${this.userApiKey}/registerForm`,{form,formId,formName},httpOptions)
  }

  editForm(form:any,formId:string):Observable<any>{
    return this._http.patch(`${this.userApiKey}/editForm`,{form,formId},httpOptions)
  }

  deleteForm(id:string):Observable<any>{
    return this._http.delete(`${this.userApiKey}/deleteForm/${id}`);
  }


  
}
 