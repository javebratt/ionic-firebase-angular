import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Party } from '../party.model';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonContent,
    IonTitle,
    IonBackButton,
    IonToolbar,
    IonHeader,
    IonButtons,
    FormsModule,
    IonDatetime,
  ],
})
export class CreatePartyComponent {
  private readonly router = inject(Router);

  name?: string;
  ticketPrice?: number;
  cost?: number;
  date?: Date;

  async createEvent(party: Partial<Party>): Promise<void> {
    // Save the party to the database
    console.log(party);
    await this.router.navigateByUrl('party');
  }
}
