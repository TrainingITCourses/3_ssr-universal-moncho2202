import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { SearchValues } from './store/models/search-values';
import { Launch } from './store/models/launch';
import { Agency } from './store/models/agency';
import { MissionType } from './store/models/mission-type';
import { Status } from './store/models/status';

@Component({
  selector: 'app-searcher-container',
  template: `
    <app-search-options-presenter
            (option)="onSelectedOption($event)">
    </app-search-options-presenter>
    <app-search-values-presenter
            [searchValues]="selectedSearchValues"
            (value) = "onSelectedValue($event)" >
    </app-search-values-presenter>
    <app-search-result-presenter
            [launches] = "filteredLaunches">
    </app-search-result-presenter>
  `,
  styles: []
})
export class SearcherContainerComponent implements OnInit {
  public searchValues: SearchValues = { agencies: [], types: [], status: [] };
  public launches: Launch[] = [];

  public selectedSearchValues: Agency[]|MissionType[]|Status[] = [];
  public searchCriteria = { option: '', value: 0 };
  public filteredLaunches: Launch[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.initData();
    this.initSearch();
  }

  private initData() {
    this.api.getAgencies().subscribe(agencies => this.searchValues.agencies = agencies);
    this.api.getTypes().subscribe(types => this.searchValues.types = types);
    this.api.getStatus().subscribe(status => this.searchValues.status = status);
    this.api.getLaunches().subscribe(launches => this.launches = launches);
  }

  private initSearch() {
    this.searchCriteria.option = '';
    this.searchCriteria.value = 0;
    this.filteredLaunches = [];
  }

  public onSelectedOption($event) {
    this.initSearch();
    this.searchCriteria.option = $event;
    this.selectedSearchValues = this.searchValues[$event];
  }

  public onSelectedValue($event) {
    this.searchCriteria.value = +$event;
    if (this.searchCriteria.value !== 0) {
      switch (this.searchCriteria.option) {
        case 'agencies':
          this.filteredLaunches = this.filterByAgency();
          break;
        case 'types':
          this.filteredLaunches = this.filterByType();
          break;
        case 'status':
          this.filteredLaunches = this.filterByStatus();
          break;
        default:
          this.filteredLaunches = [];
          break;
      }
    } else {
      this.filteredLaunches = [];
    }
  }

  private filterByAgency() {
    return this.launches.filter(launch =>
      launch.location.pads.some( pad =>
        pad.agencies && pad.agencies.some(agency => agency.id === this.searchCriteria.value)
      )
      || launch.rocket.agencies && launch.rocket.agencies.some(agency =>
        agency.id === this.searchCriteria.value
      )
      || launch.missions.some( mission =>
        mission.agencies && mission.agencies.some(agency => agency.id === this.searchCriteria.value)
      )
    );
  }

  private filterByType() {
    return this.launches.filter(launch =>
      launch.missions[0] && launch.missions[0].type === this.searchCriteria.value
      // launch.missions.some( mission => mission.type == this.searchCriteria.value )
    );
  }

  private filterByStatus() {
    return this.launches.filter(launch =>
      launch.status === this.searchCriteria.value
    );
  }
}
