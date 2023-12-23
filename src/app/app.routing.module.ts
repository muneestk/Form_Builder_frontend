import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/formCreator/login/login.component';
import { RegisterComponent } from './components/formCreator/register/register.component';
import { HomeComponent } from './components/formCreator/home/home.component';
import { userLogin } from './guard/userguard.guard';
import { AddFormComponent } from './components/formCreator/add-form/add-form.component';
import { FormRegisterComponent } from './components/formCreator/form-register/form-register.component';
import { FormDetailsComponent } from './components/formCreator/form-details/form-details.component';
import { FormEditComponent } from './components/formCreator/form-edit/form-edit.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'addform', component: AddFormComponent },
    { path: 'registerForm/:id', component: FormRegisterComponent },
    { path: 'detailForm/:id', component: FormDetailsComponent },
    { path: 'editForm/:id', component: AddFormComponent },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
