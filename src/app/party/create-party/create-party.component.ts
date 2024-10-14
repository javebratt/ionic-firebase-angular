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
import { PartyService } from '../party.service';

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
  private readonly partyService = inject(PartyService);
  private readonly router = inject(Router);

  name?: string;
  ticketPrice?: number;
  cost?: number;
  date?: Date;

  createEvent(party: Partial<Party>): void {
    party.revenue = 0;

    this.partyService.createParty(party).subscribe(() => {
      this.router.navigateByUrl('party');
    });
  }
}
