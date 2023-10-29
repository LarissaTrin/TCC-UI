import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '@app/Service/project.service';
import { ProjectListIn } from '@app/models/Interface/projectListIn';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  title = "Add new Project"

  public project = {} as ProjectListIn;
  public projectForm!: UntypedFormGroup;
  public isExpand: boolean = true;

  get form(): any {
    return this.projectForm.controls;
  }

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private projectServer: ProjectService,
    private data: DataService,
  ) {
    this.criateForm();
  }

  ngOnInit(): void {
    this.data.currentMenu.subscribe(menuExpand => this.isExpand = menuExpand);
  }

  criateForm () {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: [''],
      projectUsers: ['']
    });
  }

  showSuccess() {
    this.toastr.success('Project created successfully!', 'Success');
    this.spinner.hide();
  }
  showError() {
    this.toastr.error('Error in Server', "Error");
    this.spinner.hide();
  }

  onSubmit() {
    let idRouter = 0;
    if (this.projectForm.valid) {
      this.spinner.show();
      this.project.description = this.form.description.value;
      this.project.projectName = this.form.projectName.value;

      this.projectServer.post(this.project).subscribe(
        (project: ProjectListIn) => {
          idRouter = project.id;
          this.toastr.success('Project created successfully!', 'Success')
        },
        (error: any) => {
          console.log(error),
          this.toastr.error('Error in Server', "Error"),
          this.spinner.hide()
        },
        () => {
          this.router.navigate(['/dashboard', idRouter]),
          this.spinner.hide()
        }
      );
    }
  }

  cssValidator(fieldForm: FormControl) {
    return {'is-invalid': fieldForm.invalid && fieldForm.touched}
  }

}
