import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthFormComponent } from './auth-form/auth-form.component';

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
  ],
})
export class AuthenticationPage {
  /**
   * We're injecting the router to get the current URL
   */
  private readonly router = inject(Router);

  /**
   * From the current URL, we're getting the last part
   * of the URL to determine the current page.
   */
  readonly currentPage = this.router.url.split('/')[
    this.router.url.split('/').length - 1
  ] as 'login' | 'signup' | 'reset';

  /**
   * This object holds the configuration for the authentication page.
   * It has the page title, action button text, and the method to call
   * That way we don't need switch case or if/else to determine this values
   */
  readonly AUTH_PAGE_CONFIG = {
    login: {
      pageTitle: 'Sign In',
      actionButtonText: 'Sign In',
      method: this.login,
    },
    signup: {
      pageTitle: 'Create your account',
      actionButtonText: 'Create Account',
      method: this.signup,
    },
    reset: {
      pageTitle: 'Reset your password',
      actionButtonText: 'Reset Password',
      method: this.resetPassword,
    },
  };

  /**
   * Here we assign the page title and button text based
   * on our configuration object.
   */
  readonly pageTitle = this.AUTH_PAGE_CONFIG[this.currentPage].pageTitle;
  readonly actionButtonText =
    this.AUTH_PAGE_CONFIG[this.currentPage].actionButtonText;

  /**
   * This method gets the form value from the authentication component,
   * then it uses our configuration object to call the respective method.
   */
  handleUserCredentials({ email, password }: UserCredentials) {
    this.AUTH_PAGE_CONFIG[this.currentPage].method({ email, password });
  }

  // This will hold the logic for the login function.
  login({ email, password }: UserCredentials) {
    console.log(email, password);
  }

  // This will hold the logic for the signup function.
  signup({ email, password }: UserCredentials) {
    console.log(email, password);
  }

  // This will hold the logic for the resetPassword function.
  resetPassword({ email }: UserCredentials) {
    console.log(email);
  }
}

export interface UserCredentials {
  email: string;
  password?: string;
}
