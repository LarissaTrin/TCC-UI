import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@app/Service/account.service';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { UserUpdate } from '@app/models/Identity/UserUpdate';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  title = "Profile";

  public isExpand: boolean = true;
  public profileForm!: UntypedFormGroup;
  public userUpdate = {} as UserUpdate;

  get form(): any {
    return this.profileForm.controls;
  }

  constructor(
    private data: DataService,
    private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    
  ) { 
    this.criateForm();
  }

  ngOnInit() {
    this.data.currentMenu.subscribe(menuExpand => this.isExpand = menuExpand);
    this.getUserProfile();
  }

  getUserProfile() {
    this.spinner.show()
    this.accountService.getUser().subscribe(
      (response: UserUpdate) => {
        this.userUpdate = response;
        this.profileForm.patchValue(this.userUpdate);
      },
      (error) => {
        console.error(error);
        this.toastr.error('Error in fetching the profile', 'Error');
        this.router.navigate(['home']);
      }
    ).add(() => this.spinner.hide());
  }

  criateForm () {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'passwordConfirm')
    };

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: [''],
      description: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required],
    }, formOptions);
  }

  cssValidator(fieldForm: FormControl) {
    return {'is-invalid': fieldForm.invalid && fieldForm.touched}
  }

  onSubmit() {
    this.updateUserFunction();
  }

  updateUserFunction() {
    this.userUpdate = { ...this.profileForm.value }
    this.spinner.show();

    this.accountService.updateUser(this.userUpdate).subscribe(
      () => this.toastr.success('Updated User', 'Success'),
      (error) => {
        console.error(error);
        this.toastr.error(error.message, 'Error');
      }
    ).add(() => this.spinner.hide());
  }
}
