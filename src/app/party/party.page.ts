import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonFab,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { Party } from './party.model';
import { PartyService } from './party.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.page.html',
  styleUrls: ['./party.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonFab,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    RouterLink,
    CommonModule,
  ],
})
export class PartyPage {
  private readonly partyService = inject(PartyService);

  readonly partyList$: Observable<Party[]> = this.partyService.getPartyList();

  constructor() {
    addIcons({
      add,
    });
  }
}
