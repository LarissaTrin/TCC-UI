import { Component, OnInit } from '@angular/core';
import { Lista } from '../../../models/lista';
import { DataService } from 'src/app/Service/service.service';
import { ProjectListIn } from '@app/models/Interface/projectListIn';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListIn } from '@app/models/Interface/listIn';
import { ProjectService } from '@app/Service/project.service';
import { ListService } from '@app/Service/list.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public isExpand: boolean = true;
  public project = {} as ProjectListIn;
  public lists = {} as ListIn[];
  public userRolePermission = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private data: DataService,
    private projectService: ProjectService,
    private listService: ListService,
  ) { 
   }

  ngOnInit(): void {
    this.getProjectById();
    this.getListByProjectId()
    this.data.currentMenu.subscribe(menuExpand => this.isExpand = menuExpand);
  }

  getProjectById() {
    const projectIdParam = this.router.url.split('/')[2];

    if (projectIdParam !== null) {
      this.spinner.show();
      this.projectService.getProjectById(+projectIdParam).subscribe(
        (project: ProjectListIn) => {
          this.project = {...project};
        },
        (error: any) => {
          console.log(error);
          this.toastr.error('Project not found', "Error");
        }
      ).add(() => this.spinner.hide());
    }
  }

  getListByProjectId() {
    const projectIdParam = this.router.url.split('/')[2];

    if (projectIdParam !== null) {
      this.spinner.show();
      this.listService.getListByProjectId(+projectIdParam).subscribe(
        (lists: ListIn[]) => {
          this.lists = lists.sort((a, b) => a.order - b.order);
          this.getPermissionUser();
        },
        (error: any) => {
          console.log(error);
          this.toastr.error('Project not found', "Error");
        }
      ).add(() => this.spinner.hide());
    }
  }

  getPermissionUser() {
    var user = JSON.parse(localStorage.getItem('user') ?? '');
    if (user !== "") {
      var role = this.project.projectUsers?.find(x => x.userId === user.id)?.roleId;
      console.log("test")
      this.userRolePermission = (role !== 3);
    }
  }

  onListModified(modifiedList: ListIn[]) {
    this.lists = modifiedList;
  }
}
