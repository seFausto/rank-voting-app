import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { VotesComponent } from './votes/votes.component';

const routes: Routes = [
  { path: 'votes/results', component: ResultsComponent},
  { path: 'votes', component: VotesComponent },
  { path: 'vote', component: VotesComponent },
  { path: '', component: VotesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
