import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
}) 
export class AddFormComponent {
  private breakpointObserver = inject(BreakpointObserver);

 sidebarItem:any[] = [
          { 
            name:'Heading',
            icon:'title'
          },
          { 
            name:'Text Field',
            icon:'text_fields'
          },
          { 
            name:'Number Field',
            icon:'exposure'
          },
          { 
            name:'Date Field',
            icon:'date_range'
          },
          { 
            name:'Radio Field',
            icon:'radio_button_checked'
          },
          { 
            name:'Drop Down',
            icon:'arrow_drop_down'
          },
          { 
            name:'Button',
            icon:'smart_button'
          },
        ]
  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

 
}
