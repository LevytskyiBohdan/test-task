import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  form: FormGroup = this.formBuilder.group({
    name: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
    username: [null],
    email: [null],
    phone: [null],
    address: this.formBuilder.group({
      street: [null],
      suite: [null],
      city: [null],
      zipcode: [null]
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public _router: Router
    ) { }

  onSubmit(): void {
    const body = this.form.value;

    this.userService.createUser(body).subscribe(res => {
      console.log(res, 'res>>>>>>>')
      res ? this._router.navigate(["todo"]) : null
    })
  }

}
