import { Component } from '@angular/core';
import { AbstractControlOptions, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@app/Service/account.service';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { User } from '@app/models/Identity/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  title = "Request User"
  user = {} as User;

  public registerForm!: UntypedFormGroup;

  get form(): any {
    return this.registerForm.controls;
  }

  constructor(
    private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.criateForm();
  }

  ngOnInit(): void {
  }

  criateForm () {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'passwordConfirm')
    };

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required],
    }, formOptions);
  }

  cssValidator(fieldForm: FormControl) {
    return {'is-invalid': fieldForm.invalid && fieldForm.touched}
  }

  register() {
    this.user = { ...this.registerForm.value };
    this.accountService.register(this.user).subscribe(
      () => {this.router.navigateByUrl('home')},
      (error: any) => this.toastr.error(error.error)
    )
  }
}
