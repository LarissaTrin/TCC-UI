import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BoardComponent } from './components/dashboard/board/board.component';
import { ReportsComponent } from './components/reports_page/reports.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListBoardComponent } from './components/dashboard/list-board/list-board.component';
import { TimelineBoardComponent } from './components/dashboard/timeline-board/timeline-board.component';
import { DashboardLayerComponent } from './components/dashboard/dashboard-layer/dashboard-layer.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: 'user', component: UserComponent, children:[
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
  ]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'user/profile', component: ProfileComponent},
      {path: 'home', component: HomeComponent},
      {path: 'dashboard/:id', component: DashboardComponent, children:[
        {path: '', component: DashboardLayerComponent},
        {path: 'board', component: BoardComponent},
        {path: 'list', component: ListBoardComponent},
        {path: 'timeline', component: TimelineBoardComponent},
      ]},
      {path: 'dashboard', redirectTo: 'dashboard/0',},
      {path: 'add-project', component: AddProjectComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'metrics', component: MetricsComponent},
    ]
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
