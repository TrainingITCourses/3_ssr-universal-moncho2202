import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-options-presenter',
  template: `
    <select (change)="selectedOption($event.target.value)">
      <option value="">Select an option</option>
      <option value="agencies">agency</option>
      <option value="types">type</option>
      <option value="status">status</option>
    </select>
  `,
  styles: []
})
export class SearchOptionsPresenterComponent implements OnInit {
  @Output() public option = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  public selectedOption(option) {
    this.option.emit(option);
  }
}

