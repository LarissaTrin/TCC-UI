import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Service/service.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/Service/project.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectListIn } from 'src/app/models/Interface/projectListIn';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Lista } from '@app/models/lista';
import { Card } from '@app/models/card';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = "Dashboard";
  projectName = "test";
  public projectId = 0;
  public project = {} as ProjectListIn;
  public notFoundProject = true;
  public userRolePermission = false;
  
  public modalRef!: BsModalRef;
  public validateSection = false;
  public newSectionForm!: UntypedFormGroup;

  tabs = this.createTab();

  activeTab: any = this.tabs[0];

  public isExpand: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private data: DataService,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private fb: UntypedFormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getProjectById();
    this.getActiveTab();
    this.data.currentMenu.subscribe(menuExpand => this.isExpand = menuExpand);
  }

  getPermissionUser() {
    var user = JSON.parse(localStorage.getItem('user') ?? '');
    if (user !== "") {
      var role = this.project.projectUsers?.find(x => x.userId === user.id)?.roleId;
      this.userRolePermission = (role === 0 || role === 1);
    }
  }

  setActiveTab(tab: { id: number; title: string; route: string; }) {
    this.activeTab = tab;
    console.log("Tab ativa:",tab);
  }

  createTab() {
    return [
      {
        id: 1,
        title: 'Dashboard',
        route: `/dashboard/${this.projectId}`
      },
      {
        id: 2,
        title: 'Board',
        route: `/dashboard/${this.projectId}/board`
      },
      {
        id: 3,
        title: 'List',
        route: `/dashboard/${this.projectId}/list`
      },
      // {
      //   id: 4,
      //   title: 'Timeline',
      //   route: `/dashboard/${this.projectId}/timeline`
      // }
    ]
  }

  getProjectById() {
    const projectIdParam = this.route.snapshot.paramMap.get('id');

    if (projectIdParam !== null && projectIdParam !== '0') {
      this.spinner.show();
      this.projectId = +projectIdParam
      this.projectService.getProjectById(+projectIdParam).subscribe(
        (project: ProjectListIn) => {
          this.project = {...project};
          this.project.lists = this.project.lists?.sort((a, b) => a.order - b.order);
          this.notFoundProject = false;
          this.getPermissionUser();
        },
        (error: any) => {
          console.log(error);
          this.toastr.error('Project not found', "Error");
        }
      ).add(() => this.spinner.hide());
    }
  }

  getActiveTab() {
    let currentUrl = this.router.routerState.snapshot.url;
    this.tabs = this.createTab();
    this.activeTab = this.tabs.find(tab => currentUrl == tab.route);
  }

  // Modal edit Project
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
