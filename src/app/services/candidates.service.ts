import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private _candidates: BehaviorSubject<string[]>;

  constructor(private http: HttpClient) {

    this._candidates = new BehaviorSubject<string[]>([]);
  }

  submitRanking(ranking: string[]) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = 'https://localhost:5001/RankChoiceVoting/2134';
    const body = JSON.stringify(ranking);

    this.http.post<any>(url, body, { 'headers': headers })
      .subscribe(data => {
        console.log(data);
      });
  }

  getCandidates(voteId: number): Observable<string[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `https://localhost:5001/vote/${voteId}/candidates`;

    return this.http.get<string[]>(url, { 'headers': headers });

  }
}
