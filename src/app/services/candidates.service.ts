import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private _candidates: BehaviorSubject<string[]>;
  private dataStore: {
    candidates: string[];
  }

  constructor(private http: HttpClient) {
    this.dataStore = { candidates:[]};
    this._candidates = new BehaviorSubject<string[]>([]);
   }

   get candidates(): Observable<string[]> {
      return this._candidates.asObservable();    
   }

   loadAll() {
     const candidatesUrl = "";
     this.dataStore.candidates = [
      'Episode I - The Phantom Menace',
      'Episode II - Attack of the Clones',
      'Episode III - Revenge of the Sith',
      'Episode IV - A New Hope',
      'Episode V - The Empire Strikes Back',
      'Episode VI - Return of the Jedi',
      'Episode VII - The Force Awakens',
      'Episode VIII - The Last Jedi',
      'Episode IX – The Rise of Skywalker'
    ];
    
    this._candidates.next(Object.assign([], this.dataStore).candidates);
   }
}
