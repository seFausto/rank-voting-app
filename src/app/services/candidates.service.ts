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

  createNewRanking(ranking: string[]) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${environment.apiEndpoint}new`;
    const body = JSON.stringify(ranking);

    return this.http.post<any>(url, body, { 'headers': headers });

  }

  submitRanking(voteId: string, ranking: string[]) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${environment.apiEndpoint}vote/${voteId}`;
    const body = JSON.stringify(ranking);

    return this.http.post<any>(url, body, { 'headers': headers });
  }

  getCandidates(voteId: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${environment.apiEndpoint}vote/${voteId}/candidates`;

    return this.http.get<string[]>(url, { 'headers': headers });

  }

  getVoteIdResults(voteId: string): Observable<string[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${environment.apiEndpoint}vote/${voteId}/result`;

    return this.http.get<string[]>(url, { 'headers': headers });

  }
}
