import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/service/user-service.service';
import { PopupComponent } from '../popup/popup.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit,OnInit,OnDestroy {
  displayedColumns: string[] = ['NO', 'Form Name', 'Regitered count','Form Details','Register', 'Form Edit'];
  dataSource!: MatTableDataSource<any>;
  private _subscription:Subscription = new Subscription()

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    const token = localStorage.getItem('userSecret')
    if(token){
      const decode:any=jwtDecode(token)
      this._subscription.add(
        this._userService.getForms(decode.userId).subscribe({
          next:(res)=>{
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator; 
            this.dataSource.sort = this.sort;
          }
        })
      )
    }
  }

  constructor(
    private _userService:UserServiceService,
    private _matDialog : MatDialog
  ) { }

  share(id:string,formName:string){
    const dialogRef = this._matDialog.open(PopupComponent,{
      width : '500px',
      height : '250px',
      data:{
        title: 'Share Form',
        id:id,
        formName:formName
      }

    })
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
