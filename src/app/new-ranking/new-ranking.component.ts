import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidates.service';

@Component({
  selector: 'app-new-ranking',
  templateUrl: './new-ranking.component.html',
  styleUrls: ['./new-ranking.component.css']
})
export class NewRankingComponent implements OnInit {

  constructor(private candidateService: CandidateService) { }

  resultArray: string[];
  newCandidate: string;
  url: string;
  voteId: string;

  ngOnInit(): void {
    this.resultArray = Array();
  }

  onClickSubmit() {
    this.resultArray.push(this.newCandidate);
    this.newCandidate = "";
  }

  onClickSubmitList() {
    this.candidateService.submitNewRanking(this.resultArray)
      .subscribe(data=> {
        this.voteId = data;
        this.url = `${location.origin}/votes/${this.voteId}`
      });
  }

  test() {
    console.log("Passed");

  }
}
