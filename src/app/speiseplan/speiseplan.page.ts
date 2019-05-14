import { Component, OnInit } from '@angular/core';

import { Service } from '../services/service'
import { Gericht } from '../classes/gericht';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-speiseplan',
  templateUrl: './speiseplan.page.html',
  styleUrls: ['./speiseplan.page.scss'],
})

export class SpeiseplanPage implements OnInit {

  loadingFinished: boolean;
  selectedDate: Date = new Date();

  hauptgerichte: Gericht[];
  beilagen: Gericht[];

  constructor(private service: Service) {
  }

  ngOnInit() {
    this.getSpeiseplan();
  }

  getGericht(id: number): void {
    this.service.ladeGericht(id).subscribe(gericht => console.log(gericht));
  }

  getSpeiseplan(): void {

    combineLatest(
      this.service.ladeHauptgerichte(this.selectedDate), 
      this.service.ladeBeilagen(this.selectedDate))
      .subscribe(x => {
        this.hauptgerichte = x[0];
        this.beilagen = x[1];
        this.loadingFinished = true;
      }, () => this.loadingFinished = true);
  }

  datumChange(): void {
    this.getSpeiseplan();
  }
}
