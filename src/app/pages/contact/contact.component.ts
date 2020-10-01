import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs/operators';
import { PayService } from '../../services/pay.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, public userSvc: UserService, private mailSvc: PayService) {}

  user$ = this.userSvc.auth.user;
  recaptchaResponse: string;
  catpcha: boolean = false;

  ngOnInit(): void {
    this.arranque();
  }

  arranque() {
    this.cargarForm();
  }

  crearForm(user: any) {
    if (user) {
      this.contactForm = this.fb.group({
        name: [user.displayName, Validators.required],
        subject: ['', Validators.required],
        email: [
          user.email,
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        message: ['', [Validators.required, Validators.minLength(10)]],
      });
    } else {
      this.contactForm = this.fb.group({
        name: ['', Validators.required],
        subject: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        message: ['', [Validators.required, Validators.minLength(10)]],
      });
    }
  }

  cargarForm() {
    this.user$.pipe(take(1)).subscribe((user) => {
      this.crearForm(user);
    });
  }

  get checkNombre() {
    return (
      this.contactForm.get('name').touched &&
      this.contactForm.get('name').invalid
    );
  }
  get checkEmail() {
    return (
      this.contactForm.get('email').touched &&
      this.contactForm.get('email').invalid
    );
  }
  get checkSubject() {
    return (
      this.contactForm.get('subject').touched &&
      this.contactForm.get('subject').invalid
    );
  }
  get checkMessage() {
    return (
      this.contactForm.get('message').touched &&
      this.contactForm.get('message').invalid
    );
  }

  checkear() {
    if (this.contactForm.valid) {
      if (this.recaptchaResponse) {
        console.log(this.contactForm);
        this.mailSvc.contactMail(
          this.contactForm.get('name').value,
          this.contactForm.get('email').value,
          this.contactForm.get('subject').value,
          this.contactForm.get('message').value,
          ).pipe(take(1)).subscribe(data=>{
            this.contactForm.reset();
          });
      } else {
        this.catpcha = true;
      }
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  resolved(captchaResponse: string) {
    console.log(captchaResponse);

    this.recaptchaResponse = captchaResponse;
  }
}
