import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/formCreator/login/login.component';
import { HomeComponent } from './components/formCreator/home/home.component';
import { userLogin, userlogoutGuard } from './guard/userguard.guard';
import { AddFormComponent } from './components/formCreator/add-form/add-form.component';
import { FormRegisterComponent } from './components/formCreator/form-register/form-register.component';
import { FormDetailsComponent } from './components/formCreator/form-details/form-details.component';

const routes: Routes = [
    { path: '', component: HomeComponent ,canActivate:[userlogoutGuard]},
    { path: 'login', component: LoginComponent,canActivate:[userLogin]},
    { path: 'addform', component: AddFormComponent  ,canActivate:[userlogoutGuard]},
    { path: 'registerForm/:id', component: FormRegisterComponent },
    { path: 'detailForm/:id', component: FormDetailsComponent ,canActivate:[userlogoutGuard] },
    { path: 'editForm/:id', component: AddFormComponent  ,canActivate:[userlogoutGuard]},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
