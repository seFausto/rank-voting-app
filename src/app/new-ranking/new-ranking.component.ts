import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-ranking',
  templateUrl: './new-ranking.component.html',
  styleUrls: ['./new-ranking.component.css']
})
export class NewRankingComponent implements OnInit {

  constructor() { }

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
    this.resultArray.forEach(x => console.log(x));
  }

}
