import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidates.service';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private candidateSerivce: CandidateService) { }

  voteId: string;
  rankingInfo: [string, string][];

  ngOnInit(): void {

    this.rankingInfo = [];

    let theCookies = document.cookie.split(';');

    for (var i = 0; i < theCookies.length; i++) {
      let pastVoteId = theCookies[i].split('=')[0].trim();

      if (!pastVoteId.includes('Voted')) {
        this.candidateSerivce.getRankingInfo(pastVoteId).subscribe(title => {
          this.rankingInfo.push([pastVoteId, title]);
        });
      }
    }
  }

}
