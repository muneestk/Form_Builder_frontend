import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/service/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  StrongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  hide = true;
  hideConfirm = true;
  hideLogin = true;
  private _subscription: Subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UserServiceService,
    private _tostr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.StrongPasswordRegx)],
      ],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const user = this.registerForm.getRawValue();
      this._subscription.add(
        this._userService.registerFormBuilder(user).subscribe({
          next: (res) => {
            this._tostr.success(res.message);
            localStorage.setItem('userSecret', res.token.toString());
            this._router.navigate(['']);
          },
          error: (err) => {
            if (err.error.message) {
              this._tostr.error(err.error.message);
            } else {
              this._tostr.error('something went wrong');
            }
          },
        })
      );
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
