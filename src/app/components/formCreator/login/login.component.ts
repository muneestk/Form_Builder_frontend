import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IFormBuilder } from 'src/app/interface/interface';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm!: FormGroup
  submit:boolean = false
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  hide:boolean = true;
  hideConfirm:boolean = true;
  hideLogin:boolean = true;
  private _subscription:Subscription = new Subscription()


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService : UserServiceService,
    private _toastr : ToastrService
  ) { }

  
  ngOnInit() {
   

    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    

  }

  onLogin() {
    if(this.loginForm.valid){
      const user:IFormBuilder = this.loginForm.getRawValue()
        this._subscription.add(
          this._userService.loginFormBuilder(user).subscribe({
            next:(res)=>{
              localStorage.setItem('userSecret', res.token.toString());
              this._router.navigate([''])
            },
            error:(err) =>{
              if(err.error.message){
                this._toastr.error(err.error.message)
              }else{
                this._toastr.error('something went wrong')
              }
            }
          })
        )
      }

    }
  


  ngOnDestroy() {
    this._subscription.unsubscribe()
  }

}
