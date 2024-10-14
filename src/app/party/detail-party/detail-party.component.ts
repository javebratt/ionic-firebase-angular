import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, remove } from 'ionicons/icons';
import { Observable, switchMap } from 'rxjs';
import { Party } from '../party.model';
import { PartyService } from '../party.service';

@Component({
  selector: 'app-detail-party',
  templateUrl: './detail-party.component.html',
  styleUrls: ['./detail-party.component.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
    IonIcon,
    IonButton,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonContent,
    IonTitle,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    CommonModule,
  ],
})
export class DetailPartyComponent {
  private readonly partyService = inject(PartyService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly currentParty$: Observable<Party> = this.route.params.pipe(
    switchMap((params: { [key: string]: string }) => {
      return this.partyService.getPartyDetail(params['partyId']);
    })
  );

  constructor() {
    addIcons({
      add,
      remove,
    });
  }

  addTicketOperation(type: string, currentParty: Party) {
    return this.partyService
      .addTicketOperation(currentParty.id, currentParty.ticketPrice, type)
      .subscribe();
  }

  deleteParty(partyId: string): void {
    this.partyService.deleteParty(partyId).subscribe(() => {
      this.router.navigateByUrl('party');
    });
  }
}
