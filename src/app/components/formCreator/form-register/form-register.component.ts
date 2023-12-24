import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit,OnDestroy{

  constructor(
    private _userService:UserServiceService,
    private _activateRoute:ActivatedRoute,
    private _toastr : ToastrService,
    private _fb : FormBuilder,
    private _router:Router
    ){}

    private _subscription:Subscription = new Subscription()
    form!:FormGroup
    formId:any
    singleForm:any
    formName!:string
    authenticated:boolean=false
   
  ngOnInit(): void {
    let token = localStorage.getItem('userSecret')
    if(token){
      this.authenticated=true
    }
    this.formId = this._activateRoute.snapshot.paramMap.get('id')
    if(this.formId){
      this._subscription.add(
        this._userService.getSingleForm(this.formId).subscribe({
          next:(res)=>{    
            this.singleForm=res
            this.formName = res.formName
            this.form = this.createFormGroup(res.formFields);
          }
        })
      )
    }    
  }


    
  isKeyHeading(field: any): boolean {
    return field.type == 'heading';
  }

  isKeytext(field: any): boolean {
    return field.type == 'text' ;

  }

  isKeyNumber(field: any): boolean {
    return field.type == 'number'  ;
  }
 
  fields=['radio','checklist','date']

  private createFormGroup(formFields: any[]): FormGroup {
    const formGroupConfig: { [key: string]: any } = {};

    formFields.forEach((field) => {
      const minLengthValidator = field.rules?.minlength ? Validators.minLength(field.rules.minlength) : null;
      const maxLengthValidator = field.rules?.maxlength ? Validators.maxLength(field.rules.maxlength) : null;
      const requiredValidator = Validators.required 
      const numberValidator = field.type === 'number' ? Validators.pattern('^[0-9]+$') : null;
    
      if (field.type === 'text' || field.type === 'number') {
        formGroupConfig[field.title] = ['', [minLengthValidator, maxLengthValidator, requiredValidator, numberValidator].filter(Boolean)];
      } else if (this.fields.includes(field.type)) {
        formGroupConfig[field.title] = ['', Validators.required];
      }
    });
    
    return this._fb.group(formGroupConfig);
  }


  OnSubmit(){
    if(this.form.valid){
      const formvalue = this.form.getRawValue()
      this._subscription.add(
        this._userService.registerForm(formvalue,this.formId,this.formName).subscribe({
          next:(res)=>{
            this._router.navigate(['/succesForm'])
            this._toastr.success(res.message)
          },
          error:(err)=>{
            if(err.error.message){
              this._toastr.error(err.error.message)
            }else{
              this._toastr.error('Something went wrong')
            } 
          }
        })
      )
    }else{
      this._toastr.error('Input field must be filled');
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
