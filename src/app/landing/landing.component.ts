import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  voteId: string;
  votes: string[];

  ngOnInit(): void {

    this.votes = [];

    let theCookies = document.cookie.split(';');

    for (var i = 0; i < theCookies.length; i++) {
      let pastVoteId = theCookies[i].split('=');

      this.votes.push(pastVoteId[0].replace(/\s/g, ""));

    }
  }

}
