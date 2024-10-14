import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
  user,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly auth = inject(Auth);

  getUser(): Observable<User | null> {
    return user(this.auth);
  }

  login(email: string, password: string): Observable<UserCredential> {
    console.log('login');
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signup(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  resetPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}
