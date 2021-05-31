import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CandidateService } from '../services/candidates.service';
import { Observable } from 'rxjs';

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
    this.candidates = this.candidateService.candidates;
    this.candidateService.loadAll();

    this.candidates.subscribe(data => {
      data.forEach(element => {
        this.candidatesArray.push(element);
      });
      console.log(data)
    });

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.candidatesArray, event.previousIndex, event.currentIndex);
  }
}
