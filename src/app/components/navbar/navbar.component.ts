import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(
    private _router : Router,
    ){}

    authenticated : boolean = false

   
  ngOnInit(): void {

    let token = localStorage.getItem("userSecret")

    if(token) {
      this.authenticated = true
    }
  }

  logout():void{
    localStorage.removeItem('userSecret')
    this.authenticated=false
    this._router.navigate(['/login'])
  }
  

}
