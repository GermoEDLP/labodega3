import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  infoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.cargarFormulario();
    this.completarFormulario();
  }

  completarFormulario() {
    this.userSvc.auth.user.subscribe((data) => {
      this.infoForm.controls['name'].setValue(data.displayName);
      this.infoForm.controls['email'].setValue(data.email);
    });
  }

  cargarFormulario() {
    this.infoForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      dni: ['', [Validators.required, Validators.minLength(7)]],
      phone: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  checkear() {
    if (this.infoForm.valid) {
      if (localStorage.getItem('buyOrder')) {
        localStorage.removeItem('buyOrder');
      }
      let now = new Date().getTime();
      now = now + (15*60*1000);
      
      let item = {
        user: {
          name: this.infoForm.controls['name'].value,
          email: this.infoForm.controls['email'].value,
          dni: this.infoForm.controls['dni'].value,
          phone: this.infoForm.controls['phone'].value,
        },
        expire: now
      };
      localStorage.setItem('buyOrder', JSON.stringify(item));
      this.router.navigateByUrl('/buy/shipp');
    } else {
      this.infoForm.markAllAsTouched();
    }
  }
}
