import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AirportLocation} from '../../model/application.interface';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpService} from '../../services/http.service';
import {map, startWith} from 'rxjs/operators';
import {DirtyErrorStateMatcherDirective} from '../../validators/dirty-error-state-matcher.directive';
import {FormControlMetaData} from '../../model/form-control-meta-data';

@Component({
  selector: 'app-airport-selection',
  templateUrl: './airport-selection.component.html',
  styleUrls: ['./airport-selection.component.css']
})
export class AirportSelectionComponent implements OnInit {
  @Input() formControlMetaData: FormControlMetaData;
  @Output() selectedValue: EventEmitter<AirportLocation>;

  airportLocationFormControl: FormControl;

  airportLocations: AirportLocation[] = [];
  filteredOptions: Observable<AirportLocation[]>;
  matcher: DirtyErrorStateMatcherDirective;

  constructor(private httpService: HttpService) {
    this.selectedValue = new EventEmitter<AirportLocation>();
    this.airportLocationFormControl = new FormControl('', {validators: Validators.required});
    this.matcher = new DirtyErrorStateMatcherDirective();
  }

  ngOnInit(): void {
    this.formControlOnChange();
  }

  private formControlOnChange(): void {
    this.airportLocationFormControl.valueChanges
      .subscribe(() => {
        let searchKeyWord = this.airportLocationFormControl.value;
        if (searchKeyWord) {
          searchKeyWord = searchKeyWord.toString().trim().toLowerCase();
          const searchKeyWordLength = searchKeyWord.length;
          if (searchKeyWordLength === 3) {
            if (typeof searchKeyWord === 'string') {
              this.searchByTerm(searchKeyWord);
            }
          } else if (searchKeyWordLength < 3 && searchKeyWordLength >= 0) {
            this.airportLocations = [];
          }
        }
      });
  }

  private searchByTerm(term: string): void {
    this.httpService.fetchAirportListByTerm(term)
      .subscribe((airportLocations: AirportLocation[]) => {
        this.filteredOptions = this.airportLocationFormControl.valueChanges
          .pipe(
            startWith<string | AirportLocation>(''),
            map((value: AirportLocation) => {
              if (value) {
                return typeof value === 'string' ? value : value.description;
              }
            }),
            map((description: string) => {
              if (description) {
                return description ? this.filter(description, airportLocations) : airportLocations.slice();
              }
            }));
      });
  }

  displayFn(airportLocation?: AirportLocation): string | undefined {
    return airportLocation ? airportLocation.description : undefined;
  }

  private filter(searchValue: string, airportLocations: AirportLocation[]): AirportLocation[] {
    return airportLocations.filter((option =>
      option.description.toLowerCase().includes(searchValue.toLowerCase())));
  }

  onSelection(): void {
    if (this.airportLocationFormControl.value) {
      this.selectedValue.emit(this.airportLocationFormControl.value);
    }
  }
}
