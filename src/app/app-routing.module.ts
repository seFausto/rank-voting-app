import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NewRankingComponent } from './new-ranking/new-ranking.component';
import { ResultsComponent } from './results/results.component';
import { VotesComponent } from './votes/votes.component';

const routes: Routes = [
  { path: 'votes/results', component: ResultsComponent },
  { path: 'votes/:voteId', component: VotesComponent },  
  { path: 'votes', component: VotesComponent },  
  { path: 'vote', component: VotesComponent },
  { path: 'new', component: NewRankingComponent },
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
