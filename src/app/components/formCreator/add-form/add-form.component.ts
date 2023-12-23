import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import {  map, shareReplay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../service/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit,OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    private _toastr:ToastrService,
    private _userService:UserServiceService,
    private _router:Router,
    private _matDialog : MatDialog,
    private _activateRouter : ActivatedRoute

  ){}

  sidebarItem: any[] = [
    {
      name: 'Heading',
      icon: 'title',
    },
    {
      name: 'Text Field',
      icon: 'text_fields',
    },
    {
      name: 'Number Field',
      icon: 'exposure',
    },
    {
      name: 'Date Field',
      icon: 'date_range',
    },
    {
      name: 'Radio Field',
      icon: 'radio_button_checked',
    },
    {
      name: 'Drop Down',
      icon: 'arrow_drop_down',
    },
    {
      name: 'Button',
      icon: 'smart_button',
    },
  ];

  randomId:string=''
  formItems:any[]=[]
  editItem:any
  editTitle:string=''
  editFontsize:string=''
  editColor:string=''
  editDateTitle:string=''
  editRadioTitle:string=''
  editOptions:any
  editChecklistTitle:string=''
  editButtonTitle:string=''
  editButtonColor:string=''
  editChecklistOptions:any
  private _subsscription:Subscription=new Subscription()

  editText = {
    title:'',
    placeholder:'',
    required:false,
    minlength:0,    
    maxlength:0,
  }
  fontColors:string[]=['red','black','yellow','blue','green']
  buttonColors:string[]=['primary','accent','warn','basic']
  textTypes:string[]=['email','password','text']
  editRadioDate: any;
  
  addField(field: string) {
    let data: any;
    this.randomId = Math.random().toString(36).slice(-8);
    switch (field) {
      case 'Heading':
        data = this.generateHeading(this.randomId);
        break;
  
      case 'Text Field':
        data = this.generateTextField(this.randomId);
        break;

      case 'Number Field':
          data = this.generateNumberField(this.randomId);
          break;
          
      case 'Date Field':
        data = this.generateDatePicker(this.randomId);
        break;

      case 'Radio Field':
          data = this.generateRadio(this.randomId);
          break;
    
      case 'Drop Down':
          data = this.generateChecklist(this.randomId);
          break;
    
      case 'Button':
          data = this.generateButton(this.randomId);
          break;
    
      default:
        console.warn(`Unhandled field type: ${field}`);
        return;
    }
  
    this.formItems.push(data);
  }
  
  userId!:string;

ngOnInit(): void {
  const token = localStorage.getItem('userSecret')
  this.formid = this._activateRouter.snapshot.paramMap.get('id');
  if(token) {
    const jwtDecod:any = jwtDecode(token)
    this.userId=jwtDecod.userId
  }

  if(this.formid){
    this.formedit = true
    this._subsscription.add(
      this._userService.getSingleForm(this.formid).subscribe({
        next: (res) => {
          this.formItems = res?.formFields
        }
      })
    );
  }
}

  private generateHeading(id:string) {
    return {
        type:'heading',
        id:id,
        title: 'Heading',
        fontSize: 30,
        color: 'red',
      }
  }
  
  private generateDatePicker(id:string) {
    return {
        type:'date',
        id:id,
        title: 'Date',
      }
  }
  
  private generateRadio(id:string) {
    return {
        type:'radio',
        title: 'Radio',
        id:id,
        options: [
          {
            key:'option 1',
            value:'option 1'
          },
          {
            key:'option 2',
            value:'option 2'
          },
        ],
      }
  }

  private generateChecklist(id:string) {
    return {
        type:'checklist',
        title:'Checklist',
        id:id,
        options: [
          {
            key:'option 1',
            value:'option 1'
          },
          {
            key:'option 2',
            value:'option 2'
          },
        ],
      }
  }

  private generateButton(id:string) {
    return {
        type:'submit',
        title:'Submit',
        id:id,
        backgroundColor:'warn'
        
      }
  }
  
  private generateNumberField(id:string) {
    return {
        type:'number',
        id:id,
        title: 'number',
        placeholder: 'Enter the number',
        rules: {
          required: false,
          minlength: 4,
          maxlength: 30,
        }
      }
    
  }

  private generateTextField(id:string) {
    return  {
        type:'text',
        id:id,
        title: 'text',
        placeholder: 'Enter your text',
        rules: {
          required: false,
          minlength: 4,
          maxlength: 30,
        },
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

  deleteForm(item: any) {  
   this.formItems = this.formItems.filter((i) => i.id !== item.id)
   this.editItem=null
  }
  
  editForm(item: any) {
    this.editItem=item
    if(item.type=='heading'){
      this.editTitle = item.title; 
      this.editFontsize = item.fontSize
      this.editColor = item.color
    }else if(item.type=='text' || item.type=='number'){
      this.editText.title = item.title
      this.editText.placeholder = item.placeholder
      this.editText.required = item.rules.required
      this.editText.maxlength = item.rules.maxlength
      this.editText.minlength = item.rules.minlength
    }else if(item.type=='date'){
      this.editDateTitle = item.title
    }else if(item.type=='radio'){
      this.editRadioTitle = item.title
      this.editOptions = item.options
    }else if(item.type=='checklist'){
      this.editChecklistTitle = item.title
      this.editChecklistOptions = item.options
    }else if(item.type=='submit'){
      this.editButtonTitle = item.title
      this.editButtonColor = item.backgroundColor
    }
  }
  
  editChange(id: string) {
    const itemToEdit = this.formItems.find((i) => i.id === id);
    if (itemToEdit) {
      itemToEdit.title = this.editTitle; 
      itemToEdit.fontSize = this.editFontsize; 
      itemToEdit.color = this.editColor; 
    }
  }

  editButtonChange(id: string) {
    const itemToEdit = this.formItems.find((i) => i.id === id);
    if (itemToEdit) {
      itemToEdit.title = this.editButtonTitle; 
      itemToEdit.backgroundColor = this.editButtonColor; 
    }
  }

  editChangeDate(id: string) {
    const itemToEdit = this.formItems.find((i) => i.id === id);
    if (itemToEdit) {
      itemToEdit.title = this.editDateTitle;     
    }
  }

  editRadio(id: string,key:string,data:string) {
    const itemToEdit = this.formItems.find((i) => i.id === id);
    if (itemToEdit) {
      itemToEdit.title = this.editRadioTitle;     
    }
  }

  editChecklist(id: string,key:string,data:string) {
    const itemToEdit = this.formItems.find((i) => i.id === id);
    if (itemToEdit) {
      itemToEdit.title = this.editChecklistTitle;     
    }
  }

  addRadioOption(id:any){
    const itemToEdit = this.formItems.find((i) => i.id === id);
    if (itemToEdit) {
      let count:number=itemToEdit.options.length
      const data = {        
        key:`option ${++count}`,
        value:`option ${count}`     
    }
      itemToEdit.options.push(data)    
    }
  }



  deleteRadioitems(id:string,value:string,key:string){
    const checklistIndex = this.formItems.findIndex(item => item.id === id);

    if (checklistIndex !== -1) {
      const checklist = this.formItems[checklistIndex];
  
      for (let i = checklist.options.length - 1; i >= 0; i--) {
        const option = checklist.options[i];
        if (option.key === key && option.value === value) {
          checklist.options.splice(i, 1);
        }
      }
  
      if (checklist.options.length === 0) {
        this.formItems.splice(checklistIndex, 1);
      }
    }
  }

  deleteChecklistitems(id:string,value:string,key:string){
    const checklistIndex = this.formItems.findIndex(item => item.id === id);

    if (checklistIndex !== -1) {
      const checklist = this.formItems[checklistIndex];
  
      for (let i = checklist.options.length - 1; i >= 0; i--) {
        const option = checklist.options[i];
        if (option.key === key && option.value === value) {
          checklist.options.splice(i, 1);
        }
      }
  
      if (checklist.options.length === 0) {
        this.formItems.splice(checklistIndex, 1);
      }
    }
  }

  editChangeText(id: string) {
    const itemToEdit = this.formItems.find((i) => i.id === id);
    if (itemToEdit) {
      itemToEdit.title = this.editText.title 
      itemToEdit.placeholder = this.editText.placeholder 
      itemToEdit.rules.required = !this.editText.required 
      itemToEdit.rules.maxlength = this.editText.maxlength 
      itemToEdit.rules.minlength = this.editText.minlength 
    }
  }

  OnSubmit(){
    if(this.formItems.length===0){
      this._toastr.error('Please complete you form')
    }else{
      if(this.formedit){
        this._subsscription.add(
          this._userService.editForm(this.formItems,this.formid).subscribe({
            next:(res)=>{
              this._router.navigate([''])
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

      const dialogRef = this._matDialog.open(PopupComponent,{
        width : '500px',
        height : '300px',
        data:{
          title: 'Add Form Name'
        }
  
      })

      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.updatedData) {
          this._subsscription.add(
            this._userService.saveForm(this.formItems,result.updatedData,this.userId).subscribe({
              next:(res)=>{
                this._router.navigate([''])
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
        }
      });

    }


    }
  }
  

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

    ngOnDestroy(): void {
      this._subsscription.unsubscribe()
    }

    dragData:any

    onFieldstart(event:any){
      this.dragData=event.item
    }

    onFieldover(event:any){
      event.preventDefault()
    }

    

    onFielddrop(event:any){
      event.preventDefault()
      const target = event.target
      target.innertext = this.dragData
    }

    formid:any
    formedit:boolean=false
}
