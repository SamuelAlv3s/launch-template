import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  public form!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    console.log(this.form.value);

    const baseURL = window.location.origin;

    this.http
      .post(`${baseURL}/.netlify/functions/signup`, this.form.value)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          alert(res.message);
        },
        error(err: any) {
          alert('ERROR: ' + err.error);
        },
      });
  }
}
