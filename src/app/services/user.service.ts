import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public auth: AngularFireAuth) {}

  createUser() {
    return this.auth
      .createUserWithEmailAndPassword('german1@example.com', '123456'); 
  }
}
