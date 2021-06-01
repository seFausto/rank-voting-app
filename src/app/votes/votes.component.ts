import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CandidateService } from '../services/candidates.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css']
})
export class VotesComponent implements OnInit {

  constructor(private candidateService: CandidateService) { }

  candidates: Observable<string[]>;
  candidatesArray: string[];

  ngOnInit(): void {

    this.candidatesArray = this.candidateService.getCandidates;
  }

  onClickSubmit(data: string[]) {
    this.candidatesArray.forEach(x => console.log(x));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.candidatesArray, event.previousIndex, event.currentIndex);
  }
}
