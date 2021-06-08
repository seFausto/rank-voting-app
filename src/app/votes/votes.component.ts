import { Component, OnInit } from '@angular/core';
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

  constructor(private candidateService: CandidateService, private route: ActivatedRoute) { }

  candidates: Observable<string[]>;
  candidatesArray: string[];

  rankChoiceId: number;

  ngOnInit(): void {
    
    this.route.queryParams
      .subscribe(params => {
        this.rankChoiceId = params.id;        
        this.candidatesArray = this.candidateService.getCandidates(this.rankChoiceId);
      });
  }

  onClickSubmit(data: string[]) {
    this.candidateService.submitRanking(data);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.candidatesArray, event.previousIndex, event.currentIndex);
  }
}
