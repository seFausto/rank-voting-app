import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CandidateService } from '../services/candidates.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css']
})
export class VotesComponent implements OnInit {

  constructor(private candidateService: CandidateService,
    private route: ActivatedRoute, private _snackbar: MatSnackBar) { }

  candidates: Observable<string[]>;
  candidatesArray: string[];

  voteId: string | null;
  voteSubmitted: boolean;

  cookieName: string;
  cookieVote: string;
  userId: string;

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {

        this.voteId = params.get("voteId");

        this.cookieName = `${this.voteId}`;
        this.cookieVote = `${this.voteId}Voted`
        this.voteSubmitted = getCookie(this.cookieVote) != "";

        if (getCookie(this.cookieName) == "") {
          this.userId = nanoid(5);
        }
        else {
          this.userId = getCookie(this.cookieName) as string;
        }
        setCookie(this.cookieName, this.userId);

        if (this.voteId != null) {
          this.candidateService.getCandidates(this.voteId, this.userId, this.voteSubmitted)
            .subscribe(data => this.candidatesArray = data);
        }
      });
  }

  onClickSubmit(data: string[]) {
    if (this.voteId != null) {

      this.candidateService.submitRanking(this.voteId, data, this.userId)
        .subscribe(result => {
          if (result) {
            this._snackbar.open("Ranking submitted", "Ok", { duration: 3000 });
            this.voteSubmitted = true;
            setCookie(this.cookieVote, "true");
          }
        });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.candidatesArray, event.previousIndex, event.currentIndex);
  }
}

export function setCookie(name: string, val: string) {
  document.cookie = name + "=" + val;
}

export function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  if (parts.length == 2) {
    var cookie = parts.pop();
    if (cookie != undefined) {
      return cookie.split(";").shift();
    }
  }

  return "";
}