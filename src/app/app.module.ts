import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/formCreator/login/login.component';
import { RegisterComponent } from './components/formCreator/register/register.component';
import { HomeComponent } from './components/formCreator/home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './materials/material.module';
import { UserServiceService } from './service/user-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/formCreator/navbar/navbar.component';
import { AddFormComponent } from './components/formCreator/add-form/add-form.component';
import { PopupComponent } from './components/formCreator/popup/popup.component';
import { FormRegisterComponent } from './components/formCreator/form-register/form-register.component';
import { FormDetailsComponent } from './components/formCreator/form-details/form-details.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { SuccessComponent } from './components/formCreator/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    AddFormComponent,
    PopupComponent,
    FormRegisterComponent,
    FormDetailsComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    ShareButtonsModule,
    ShareIconsModule
    
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
