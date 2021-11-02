import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CandidateService } from '../services/candidates.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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


  ngOnInit(): void {

    this.route.paramMap
      .subscribe(params => {

        this.voteId = params.get("voteId");
        if (this.voteId != null) {
          this.candidateService.getCandidates(this.voteId)
            .subscribe(data => this.candidatesArray = data);
        }
      });

      this.voteSubmitted = false;
  }

  onClickSubmit(data: string[]) {
    if (this.voteId != null) {
      this.candidateService.submitRanking(this.voteId, data)
        .subscribe(result => {
          if (result)
          {
            this._snackbar.open("Ranking submitted", "Ok", { duration: 3000 });
            this.voteSubmitted = true;
          }
        });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.candidatesArray, event.previousIndex, event.currentIndex);
  }
}
