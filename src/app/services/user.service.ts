import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public auth: AngularFireAuth, private db: AngularFirestore) {}

  createUserAuth(email: string, pass: string) {
    return this.auth.createUserWithEmailAndPassword(email, pass);
  }

  createUserDB(user: User) {
    return this.db.collection('user').doc(user.uid).set(user);
  }

  sentEmailVerification(email: string) {
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'http://labodegabebidas.web.app',
      // This must be true.
      handleCodeInApp: true,
    };
    return this.auth.sendSignInLinkToEmail(email, actionCodeSettings);
  }

  loginWithEmailAndPass(email: string, pass: string) {
    this.auth.setPersistence('session');
    return this.auth.signInWithEmailAndPassword(email, pass);
  }

  cuurentUser(){
    return this.auth.currentUser;
  }

  logout(){
    return this.auth.signOut();
  }
}
