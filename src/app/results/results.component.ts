import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidates.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private candidateService: CandidateService,
    private route: ActivatedRoute) { }


  resultArray: string[];
  voteId: string;

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.voteId = params.id;

        this.candidateService.getVoteIdResults(this.voteId)
          .subscribe(data => this.resultArray = data);

      });
  }

}
