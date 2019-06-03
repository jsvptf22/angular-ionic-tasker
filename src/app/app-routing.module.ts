import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';

const routes: Routes = [
  { path: '', redirectTo: 'access', pathMatch: 'full' },
  { path: 'access', loadChildren: './access/access.module#AccessPageModule' },
  { 
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardPageModule',
    canActivate: [AuthorizationService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
