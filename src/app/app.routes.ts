import { Routes } from '@angular/router';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
  {path: '', redirectTo: '/welcome',  pathMatch: 'full'},
  {path: 'welcome', component: WelcomepageComponent},
  {path: 'home', component: HomepageComponent}
];
