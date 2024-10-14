import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Subscription, tap } from 'rxjs';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    AuthFormComponent,
    RouterLink,
  ],
})
export class AuthenticationPage implements OnDestroy {
  /**
   * We're injecting the router to get the current URL
   */
  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);

  /**
   * From the current URL, we're getting the last part
   * of the URL to determine the current page.
   */
  readonly currentPage = this.router.url.split('/')[
    this.router.url.split('/').length - 1
  ] as 'login' | 'signup' | 'reset';

  /**
   * This object holds the configuration for the authentication page.
   * It has the page title and action button text for each page.
   * That way we don't need switch case or if/else to determine this values
   */
  readonly AUTH_PAGE_CONFIG = {
    login: {
      pageTitle: 'Sign In',
      actionButtonText: 'Sign In',
    },
    signup: {
      pageTitle: 'Create your account',
      actionButtonText: 'Create Account',
    },
    reset: {
      pageTitle: 'Reset your password',
      actionButtonText: 'Reset Password',
    },
  };

  /**
   * Here we assign the page title and button text based
   * on our configuration object.
   */
  readonly pageTitle = this.AUTH_PAGE_CONFIG[this.currentPage].pageTitle;
  readonly actionButtonText =
    this.AUTH_PAGE_CONFIG[this.currentPage].actionButtonText;

  private activeSubscription?: Subscription;

  /**
   * This method gets the form value from the authentication component,
   * then it calls the respective method.
   */
  handleUserCredentials(userCredentials: UserCredentials) {
    switch (this.currentPage) {
      case 'login':
        this.login(userCredentials);
        break;
      case 'signup':
        this.signup(userCredentials);
        break;
      case 'reset':
        this.resetPassword(userCredentials);
        break;
    }
  }

  login({ email, password }: UserCredentials) {
    this.activeSubscription = this.authenticationService
      .login(email, password)
      .pipe(tap(() => this.router.navigateByUrl('')))
      .subscribe();
  }

  signup({ email, password }: UserCredentials) {
    this.activeSubscription = this.authenticationService
      .signup(email, password)
      .pipe(tap(() => this.router.navigateByUrl('')))
      .subscribe();
  }

  resetPassword({ email }: UserCredentials) {
    this.activeSubscription = this.authenticationService
      .resetPassword(email)
      .pipe(tap(() => this.router.navigateByUrl('auth/login')))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.activeSubscription?.unsubscribe();
  }
}

export interface UserCredentials {
  email: string;
  password: string;
}
