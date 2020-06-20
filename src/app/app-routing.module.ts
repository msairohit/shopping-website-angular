import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { ManageVegetablesComponent } from './manage-vegetables/manage-vegetables.component';
import { CartComponent } from './cart/cart.component';
import { LoginSignupTestComponent } from './login-signup-test/login-signup-test.component';


const routes: Routes = [
  {path : '', redirectTo : '/home', pathMatch : 'full'},
  {path : 'home', component : HomeComponent},
  {path : 'test', component : TestComponent},
  {path : 'signUp', component : SignUpComponent},
  {path : 'vegetables', component : VegetablesComponent},
  {path : 'manage/vegetables', component : ManageVegetablesComponent},
  {path : 'cart', component : CartComponent},
  {path : 'testLogin', component : LoginSignupTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
