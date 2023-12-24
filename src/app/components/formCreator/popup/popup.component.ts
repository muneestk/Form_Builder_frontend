import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(
    private _ref: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _builder: FormBuilder
  ) {}

  formName: boolean = false;
  confirmDelete: boolean = false;
  shareForm: boolean = false;
  inputData: any;
  encodedString!: any  


  FormSave = this._builder.group({
    name: this._builder.control('', Validators.required)
  });

  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.title === 'Add Form Name') {
      this.formName = true;
    }else if(this.inputData.title === 'Share Form'){
      this.shareForm=true
      this.encodedString = `https://form-builder-virid-seven.vercel.app/registerForm/${encodeURIComponent(this.inputData.id)}`;
    }else{
      this.confirmDelete=true
    }
  }



  formnameSave():void {
    const form = this.FormSave.getRawValue()
    if(this.FormSave.valid){
      this._ref.close({ updatedData: form });
    }
  }

  onConfirm():void{
    this._ref.close(true);
  }
  

  


}
