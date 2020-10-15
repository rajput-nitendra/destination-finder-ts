import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AirportLocation, Fare} from '../model/application.interface';
import {ApplicationConstants} from '../config/application-constants.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  fetchAirportList(): Observable<AirportLocation[]> {
    return this.httpClient.get<AirportLocation[]>(ApplicationConstants.AirportListEndpoint);
  }

  fetchAirportListByTerm(term: string): Observable<AirportLocation[]> {
    return this.httpClient.get<AirportLocation[]>(ApplicationConstants.SearchByTermEndpoint + term);
  }

  calculateFare(originCode: string, destinationCode: string): Observable<Fare> {
    return this.httpClient.get<Fare>(ApplicationConstants.CalculateFaresEndpoint + '/' + originCode + '/' + destinationCode);
  }
}
