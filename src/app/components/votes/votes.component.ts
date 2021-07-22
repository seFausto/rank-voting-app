import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CandidateService } from '../../services/candidates.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css']
})
export class VotesComponent implements OnInit {

  constructor(private candidateService: CandidateService, 
    private route: ActivatedRoute) { }

  candidates: Observable<string[]>;
  candidatesArray: string[];

  voteId: string;

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.voteId = params.id;

        this.candidateService.getCandidates(this.voteId)
          .subscribe(data => this.candidatesArray = data);
      });
  }

  onClickSubmit(data: string[]) {
    this.candidateService.submitRanking(this.voteId, data);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.candidatesArray, event.previousIndex, event.currentIndex);
  }
}
