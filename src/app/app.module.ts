import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule, Routes } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/dashboard/board/board.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './shared/list/list.component';
import { CardComponent } from './shared/card/card.component';
import { SidebarComponent } from './shared/menu/sidebar/sidebar.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { ReportsComponent } from './components/reports_page/reports.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardLayerComponent } from './components/dashboard/dashboard-layer/dashboard-layer.component';
import { ListBoardComponent } from './components/dashboard/list-board/list-board.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { TimelineBoardComponent } from './components/dashboard/timeline-board/timeline-board.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { TitleComponent } from './shared/title/title.component';
import { NavbarComponent } from './shared/menu/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { EditProjectComponent } from './shared/edit-project/edit-project.component';
import { EditBoardComponent } from './shared/edit-project/edit-board/edit-board.component';
import { EditSettingsComponent } from './shared/edit-project/edit-settings/edit-settings.component';
import { EditUsersComponent } from './shared/edit-project/edit-users/edit-users.component';

import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { FilterOrderPipe } from './helpers/FilterOrder.pipe';
import { FindListNamePipe } from './helpers/FindListName.pipe';

import { DataService } from './Service/service.service';
import { ProjectService } from './Service/project.service';
import { ListService } from './Service/list.service';
import { CardService } from './Service/card.service';
import { AccountService } from './Service/account.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';


const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    HomeComponent,
    ProfileComponent,
    TitleComponent,
    ListComponent,
    CardComponent,
    SidebarComponent,
    MetricsComponent,
    ReportsComponent,
    NavbarComponent,
    DashboardComponent,
    DashboardLayerComponent,
    ListBoardComponent,
    TimelineBoardComponent,
    AddProjectComponent,
    DateTimeFormatPipe,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    EditProjectComponent,
    EditBoardComponent,
    EditSettingsComponent,
    EditUsersComponent,
    FilterOrderPipe,
    FindListNamePipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    MatAutocompleteModule,
    ModalModule.forRoot(), //sem o forRoot nao funciona
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxSpinnerModule,
  ],
  providers: [
    DataService,
    ProjectService,
    ListService,
    CardService,
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
