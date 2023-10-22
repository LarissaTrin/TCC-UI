import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Card } from '../../models/card';
import { ProjectService } from '../../Service/project.service';
import { ProjectListIn } from '../../models/Interface/projectListIn';
import { Constants } from '../../util/constants';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/Service/service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '@app/models/Identity/User';
// import { Project } from '../models/project';
// import { HttpClient } from '@angular/common/http';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
// import { Editor } from '@ckeditor/ckeditor5-core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  private date = {} as Date;
  private hour: any;

  public projects: ProjectListIn[] = [];
  // listTasks: Card[] = [];
  // listTasksAt: Card[] = [];
  // listTasksCon: Card[] = [];

  // tabs = [
  //   {
  //     id: 1,
  //     title: Constants.tabName[0],
  //     content: this.listTasks
  //   },
  //   {
  //     id: 2,
  //     title: Constants.tabName[1],
  //     content: this.listTasksAt
  //   },
  //   {
  //     id: 3,
  //     title: Constants.tabName[2],
  //     content: this.listTasksCon
  //   }
  // ];

  // activeTab = this.tabs[0];

  public user = "";
  public month = "";
  public week = "";
  public day = "";
  public sldation: any;
  public isExpand: boolean = true;

  constructor( 
    private projectService: ProjectService,
    private toastr: ToastrService,
    private data: DataService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getNameUser();
    this.date = new Date();
    this.getDate();
    this.getProjects();
    this.data.currentMenu.subscribe(menuExpand => this.isExpand = menuExpand);
  }

  getNameUser() {
    let user: User;

    if(localStorage.getItem('user')){
      user = JSON.parse(localStorage.getItem('user') ?? '{}');
      this.user = user.firstName;
    }
    
  }

  getDate() {
    this.month = this.date.toLocaleDateString('en', { month: 'long' });
    this.week = this.date.toLocaleDateString('en', { weekday: 'long' });
    this.day = this.date.toLocaleDateString('en', { day: 'numeric' });
    this.hour = this.date.getHours();
    this.sldation = this.hour < 12 ? "Good Morning," : this.hour < 18 ? "Good Afternoon," : "Good Evening,";
  }

  public getProjects(): void {
    this.spinner.show();
    this.projectService.getProjects().subscribe(
      (_projects: ProjectListIn[]) => {
        this.projects = _projects;
      },
      (error: any) => {
        console.log(error);
        this.toastr.error('Error in Server', "Error");
      }
    ).add(() => this.spinner.hide());
    
  }

  // setActiveTab(tab: { id: number; title: string; content: Card[]; }) {
  //   this.activeTab = tab;
  //   console.log("Tab ativa:",tab);
  // }
}
