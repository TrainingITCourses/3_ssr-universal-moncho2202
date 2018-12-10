import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Agency } from './store/models/agency';
import { Status } from './store/models/status';
import { MissionType } from './store/models/mission-type';
import { Launch } from './store/models/launch';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getAgencies = (): Observable<Agency[]> =>
    this.http
      .get(environment.url + '/assets/data/agencies.json')
      .pipe(map((res: any) => res.agencies));

  public getTypes = (): Observable<MissionType[]> =>
    this.http
      .get(environment.url + '/assets/data/missiontypes.json')
      .pipe(map((res: any) => res.types));

  public getStatus = (): Observable<Status[]> =>
    this.http
      .get(environment.url + '/assets/data/launchstatus.json')
      .pipe(map((res: any) => res.types));

  public getLaunches = (): Observable<Launch[]> =>
    this.http
      .get(environment.url + '/assets/data/launches.json')
      .pipe(map((res: any) => res.launches));
}
