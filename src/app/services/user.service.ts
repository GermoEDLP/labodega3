import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User;

  constructor(public auth: AngularFireAuth, private db: AngularFirestore) {}

  createUserAuth(email: string, pass: string) {
    return this.auth.createUserWithEmailAndPassword(email, pass);
  }

  async createUserDB(user: User) {
    (await this.auth.currentUser).updateProfile({
      displayName: user.name,
    });
    return this.db.collection('user').doc(user.uid).set(user);
  }

  async sentEmailVerification() {
    return (await this.auth.currentUser).sendEmailVerification();
  }

  loginWithEmailAndPass(email: string, pass: string) {
    this.auth.setPersistence('session');
    return this.auth.signInWithEmailAndPassword(email, pass);
  }

  logout() {
    return this.auth.signOut();
  }
}
