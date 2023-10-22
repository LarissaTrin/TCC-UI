import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ProjectService } from '@app/Service/project.service';
import { ProjectListIn } from '@app/models/Interface/projectListIn';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss']
})
export class EditSettingsComponent implements OnInit {
  @Input() project = {} as ProjectListIn;

  public projectForm!: UntypedFormGroup;

  get form(): any {
    return this.projectForm.controls;
  }


  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: UntypedFormBuilder,
    private projectServer: ProjectService,
  ) {
    this.criateForm();
  }

  ngOnInit() {
    this.projectForm.patchValue(this.project);
  }

  criateForm () {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: [''],
    });
  }
  
  cssValidator(fieldForm: FormControl) {
    return {'is-invalid': fieldForm.invalid && fieldForm.touched}
  }

  saveProject() {
    this.spinner.show();
    this.project.description = this.form.description.value;
    this.project.projectName = this.form.projectName.value;
    this.projectServer.put(this.project).subscribe(
      () => {
        this.toastr.success("Project modified.", "Success");
      },
      (error: any) => {
        console.log(error);
        this.toastr.error("Error while trying to modify the project.", "Error");
      },
      () => this.spinner.hide(),
    ).add(() => this.spinner.hide());
  }

}
