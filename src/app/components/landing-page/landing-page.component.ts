import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {AirportLocation, Fare} from '../../model/application.interface';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {FormControlMetaData} from '../../model/form-control-meta-data';
import {ApplicationConstants} from '../../config/application-constants.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  airportLocations: AirportLocation[] = [];

  originFormControlMetaData: FormControlMetaData;
  destinationFormControlMetaData: FormControlMetaData;

  originLocation: AirportLocation;
  destinationLocation: AirportLocation;
  fare: Fare;

  fareAmount = '123432';
  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Calculate fare',
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  };

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.initializeFormControlMetaData();
  }

  originSelectedValue(airportLocation: AirportLocation): void {
    this.originLocation = airportLocation;
  }

  destinationSelectedValue(airportLocation: AirportLocation): void {
    this.destinationLocation = airportLocation;
  }

  calculateFare(): void {
    if (this.originLocation && this.originLocation.code && this.destinationLocation && this.destinationLocation.code) {
      this.spinnerButtonOptions.active = true;
      this.httpService.calculateFare(this.originLocation.code, this.destinationLocation.code)
        .subscribe((fare: Fare) => {
          this.spinnerButtonOptions.active = false;
          this.fare = fare;
        }, error => {
          this.spinnerButtonOptions.active = false;
        });
    } else {

    }
  }

  private initializeFormControlMetaData(): void {
    this.originFormControlMetaData = new FormControlMetaData();
    this.originFormControlMetaData.placeHolder = ApplicationConstants.OriginFormControlPlaceHolder;
    this.originFormControlMetaData.requiredErrorMessage = ApplicationConstants.OriginFormControlRequiredErrorMessage;
    this.originFormControlMetaData.invalidErrorMessage = ApplicationConstants.OriginFormControlInvalidSelectionErrorMessage;

    this.destinationFormControlMetaData = new FormControlMetaData();
    this.destinationFormControlMetaData.placeHolder = ApplicationConstants.DestinationFormControlPlaceHolder;
    this.destinationFormControlMetaData.requiredErrorMessage = ApplicationConstants.DestinationFormControlRequiredErrorMessage;
    this.destinationFormControlMetaData.invalidErrorMessage = ApplicationConstants.DestinationFormControlInvalidSelectionErrorMessage;
  }
}
