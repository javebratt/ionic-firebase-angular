import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentSnapshot,
  Firestore,
  runTransaction,
} from '@angular/fire/firestore';
import {
  catchError,
  EMPTY,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { Party } from './party.model';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  private readonly auth = inject(AuthenticationService);
  private readonly firestore = inject(Firestore);

  createParty(party: Partial<Party>) {
    return this.auth.getUser().pipe(
      filter((user) => !!user),
      map((user) => user?.uid),
      tap((uid) => {
        const partyCollection = collection(
          this.firestore,
          `users/${uid}/party`
        );
        return addDoc(partyCollection, party);
      })
    );
  }

  getPartyList() {
    return this.auth.getUser().pipe(
      filter((user) => !!user),
      map((user) => user?.uid),
      switchMap((userId) => {
        const partyCollection = collection(
          this.firestore,
          `users/${userId}/party`
        );

        return collectionData(partyCollection, { idField: 'id' }) as Observable<
          Party[]
        >;
      })
    );
  }

  getPartyDetail(partyId: string): Observable<Party> {
    return this.auth.getUser().pipe(
      filter((user) => !!user),
      map((user) => user?.uid),
      switchMap((userId) => {
        const partyDocument = doc(
          this.firestore,
          `users/${userId}/party/${partyId}`
        );
        return docData(partyDocument, { idField: 'id' }) as Observable<Party>;
      })
    );
  }

  addTicketOperation(
    partyId: string,
    ticketCost: number,
    type: string = 'add'
  ) {
    return this.auth.getUser().pipe(
      filter((user) => !!user),
      map((user) => user?.uid),
      switchMap((userId) => {
        const partyDocRef = doc(
          this.firestore,
          `users/${userId}/party/${partyId}`
        );

        return runTransaction(this.firestore, async (transaction) => {
          const partyDoc = (await transaction.get(
            partyDocRef
          )) as DocumentSnapshot<Party>;
          const party = partyDoc.data() as Party;
          const newRevenue =
            type === 'add'
              ? party.revenue + ticketCost
              : party.revenue - ticketCost;
          transaction.update(partyDocRef, { revenue: newRevenue });
        });
      }),
      catchError((error) => {
        console.error('Error adding ticket operation: ', error);
        return EMPTY;
      })
    );
  }

  deleteParty(partyId: string): Observable<void> {
    return this.auth.getUser().pipe(
      filter((user) => !!user),
      map((user) => user?.uid),
      switchMap((userId) => {
        const partyDocument = doc(
          this.firestore,
          `users/${userId}/party/${partyId}`
        );
        return deleteDoc(partyDocument);
      })
    );
  }
}
