import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '@app/Service/project.service';
import { ProjectListIn } from '@app/models/Interface/projectListIn';
import { ProjectUserIn } from '@app/models/Interface/projectUserIn';
import { Card } from '@app/models/card';
import { Lista } from '@app/models/lista';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  @Input() project = {} as ProjectListIn;
  @Input() modalRef!: BsModalRef;

  public items = ["Settings", "Users", "Board"];
  public activeTab = "Settings";
  public deleteProjectModalRef!: BsModalRef;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private projectServer: ProjectService,
  ) {
  }

  ngOnInit() {
  }

  setActiveTab(item: string) {
    this.activeTab = item;
  }

  openModal(template: TemplateRef<any>) {
    this.deleteProjectModalRef = this.modalService.show(template);
  }

  closeModal() {
    if (this.deleteProjectModalRef) this.deleteProjectModalRef.hide();
  }

  deleteProjectConfirm() {
    this.spinner.show();
    this.projectServer.delete(this.project.id).subscribe(
      () => {
        this.toastr.success("Project deleted successfully.", "Success");
      },
      (error: any) => {
        console.log(error);
        this.toastr.error("Error while trying to delete project.", "Error");
      },
      () => this.spinner.hide(),
    ).add(() => this.spinner.hide());
    this.deleteProjectModalRef.hide()
    this.modalService.hide();
    this.router.navigate(['/home']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
