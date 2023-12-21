import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/formCreator/login/login.component';
import { RegisterComponent } from './components/formCreator/register/register.component';
import { HomeComponent } from './components/formCreator/home/home.component';
import { userLogin } from './guard/userguard.guard';
import { AddFormComponent } from './add-form/add-form.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'addform', component: AddFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
