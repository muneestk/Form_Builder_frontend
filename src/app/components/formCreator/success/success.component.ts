import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit{

  authenticated:boolean=false
  ngOnInit(): void {
    this.authenticated=localStorage.getItem('userSecret')?true:false
  }
}
