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

  ngOnInit(): void {
    this.resultArray = Array();
  }

  onClickSubmit() {
    this.resultArray.push(this.newCandidate);
    this.newCandidate = "";
  }

  onClickSubmitList() {
    this.candidateService.submitNewRanking(this.resultArray);
  }

  test() {
    console.log("Passed");

  }
}
