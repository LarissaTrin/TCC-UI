import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectUserService } from '@app/Service/projectUser.service';
import { ProjectUserIn } from '@app/models/Interface/projectUserIn';
import { UserIn } from '@app/models/Interface/userIn';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { Constants } from '@app/util/constants';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  @Input() projectUsers: ProjectUserIn[] | undefined;
  @Input() projectId: number | undefined;
  @Input() owner: number | undefined;

  Constants = Constants;

  public formNewUser!: UntypedFormGroup;

  public pagination = {} as Pagination;
  public usersList = {} as UserIn[];

  termoBuscaChanged: Subject<string> = new Subject<string>();

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private modalService: BsModalService,
    private fb: UntypedFormBuilder,
    private projectUserService: ProjectUserService,
  ) {
    this.criateForm();
  }

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 4,
      totalItems: 4,
    } as Pagination;
    this.getAllUsers();
  }

  criateForm () {
    this.formNewUser = this.fb.group({
      selectEmail: ['', Validators.required],
    });
  }

  filterUsers(evt: any): void {
    console.log(evt.value)
    if (this.termoBuscaChanged.observers.length === 0) {
      this.termoBuscaChanged
        .pipe(debounceTime(1000))
        .subscribe((filterBy) => {
          this.spinner.show();
          this.projectUserService
            .GetUsersByEditAsync(
              this.projectId,
              this.pagination.currentPage, this.pagination.itemsPerPage,
              filterBy
            )
            .subscribe(
              (response: PaginatedResult<UserIn[]>) => {
                this.usersList = response.result;
              },
              (error: any) => {
                this.spinner.hide();
                this.toastr.error('Erro ao Carregar os Palestrantes', 'Erro!');
              }
            )
            .add(() => this.spinner.hide());
        });
    }
    this.termoBuscaChanged.next(evt.value);
  }

  addUser() {
    let selectedUser = this.usersList.find(user => user.email?.includes(this.formNewUser.value.selectEmail));
    if (selectedUser !== undefined) {
      const addUser: ProjectUserIn = { 
        userId: selectedUser.id,
        projectId: this.projectId ? this.projectId : 0,
        roleId: 3,
        order: 0,
        user: selectedUser,
      };
      this.projectUsers?.push(addUser);
    }
    this.formNewUser.reset();
    console.log("projectUsers: ", this.projectUsers);

  }

  getAllUsers() {
    this.spinner.show();
    this.projectUserService.GetUsersByEditAsync(this.projectId, this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (response: PaginatedResult<UserIn[]>) => {
        this.usersList = response.result;
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Error loading list of users');
      },
      () => this.spinner.hide(),
    ).add(() => {
      this.spinner.hide();
    });
  }

  changeOrder(item: ProjectUserIn) {
    if (item.order === -1) item.order = 0;
    else item.order = -1;
  }
  
  saveUsersList() {
    this.spinner.show();
    if (this.projectUsers) {
      this.projectUsers.forEach(x => {
        x.roleId = Number(x.roleId);
      });
    }
    const clonedList: ProjectUserIn[] = [];

    if (this.projectUsers) {
      for (const list of this.projectUsers) {
        const clonedListObject: ProjectUserIn = { 
          userId: list.userId,
          projectId: list.projectId,
          roleId: list.roleId,
          order: list.order
        };
        clonedList.push(clonedListObject);
      }
    }
    if (this.projectId && this.projectUsers) {
      this.projectUserService.saveUsersByProject(this.projectId, clonedList).subscribe(
        () => {
          this.toastr.success("Users updated successfully.", "Success");
        },
        (error: any) => {
          console.log(error);
          this.toastr.error("Error while trying to updated the users.", "Error");
        },
        () => this.spinner.hide(),
      ).add(() => {
        this.spinner.hide();
        window.location.reload();
      });
    } else {
      this.toastr.error("Error while trying to updated the users.", "Error");
      this.spinner.hide();
    }
  }
}
