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
    ranking.forEach(x => console.log(x));

    const headers = new HttpHeaders({      
      'Content-Type': 'application/json'
    });

    const url = 'https://localhost:5001/RankChoiceVoting';
    const body = JSON.stringify(ranking);

    this.http.post<any>(url, body, { 'headers': headers })
      .subscribe(data => {
        console.log(data);
      });
  }

  getCandidates(rankChoiceId: number): string[] {

    if (rankChoiceId == 123) {
      return [
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
    }
    else {
      return [
        'Kevin',
        'Randall',
        'Kate',
        'Rebecca',
        'Jack',
        'Toby',
        'William',
        'Beth',
        'Madison'
      ];
    }


  }
}
