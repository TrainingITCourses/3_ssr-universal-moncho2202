import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Agency } from './store/models/agency';
import { MissionType } from './store/models/mission-type';
import { Status } from './store/models/status';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-values-presenter',
  template: `
    <select (change)="selectedValue($event.target.value)">
      <option value="0"></option>
      <option [value]="searchValue.id" *ngFor="let searchValue of searchValues">{{ searchValue.name }}</option>
    </select>
  `,
  styles: []
})
export class SearchValuesPresenterComponent implements OnInit {
  @Input() public searchValues: Agency[]|MissionType[]|Status[];
  @Output() public value = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  public selectedValue(value) {
    this.value.emit(value);
  }
}
