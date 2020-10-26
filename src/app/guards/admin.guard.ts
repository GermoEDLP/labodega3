import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/interfaces';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  user$: Observable<User>;

  constructor(private userSvc: UserService, private router: Router, public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = afAuth.authState.pipe(
      switchMap((user)=>{
      if(user){
        return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
      }
      return of(null);
    })
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    
      return this.user$.pipe(take(1), map(user=>{
        if(user.role=='ADMIN_ROLE'){
          return true;
        }else{
          this.router.navigateByUrl('/home')
          return false;
        }
      }))
  }
}
