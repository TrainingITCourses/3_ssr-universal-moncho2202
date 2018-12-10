import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Launch } from './store/models/launch';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-result-presenter',
  template: `
    <p>{{ launches.length }} launches found</p>
    <ul>
      <li *ngFor="let launche of launches">{{ launche.name }}</li>
    </ul>
  `,
  styles: []
})
export class SearchResultPresenterComponent implements OnInit {
  @Input() public launches: Launch[] = [];

  constructor() { }

  ngOnInit() { }

}
