import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private _candidates: BehaviorSubject<string[]>;

  constructor(private http: HttpClient) {

    this._candidates = new BehaviorSubject<string[]>([]);
  }

  submitRanking(voteId: string, ranking: string[]) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${environment.apiEndpoint}${voteId}`;
    const body = JSON.stringify(ranking);

    this.http.post<any>(url, body, { 'headers': headers })
      .subscribe(data => {
        console.log(data);
      });
  }

  getCandidates(voteId: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${environment.apiEndpoint}${voteId}/candidates`;

    return this.http.get<string[]>(url, { 'headers': headers });

  }

  getVoteIdResults(voteId: string): Observable<string[]>{
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${environment.apiEndpoint}${voteId}/result`;

    return this.http.get<string[]>(url, { 'headers': headers });

  }
}
