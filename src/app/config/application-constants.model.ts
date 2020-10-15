export class ApplicationConstants {
  private static BaseUrl = 'http://localhost:9000/travel';
  public static AirportListEndpoint = ApplicationConstants.BaseUrl + '/airports/';
  public static SearchByTermEndpoint = ApplicationConstants.BaseUrl + '/airports?term=';
  public static CalculateFaresEndpoint = ApplicationConstants.BaseUrl + '/fares';

  // Form control meta data
  public static OriginFormControlPlaceHolder = 'Origin';
  public static OriginFormControlRequiredErrorMessage = 'Please select a origin!';
  public static OriginFormControlInvalidSelectionErrorMessage = 'Please select a valid origin!';
  public static DestinationFormControlPlaceHolder = 'Destination';
  public static DestinationFormControlRequiredErrorMessage = 'Please select a destination!';
  public static DestinationFormControlInvalidSelectionErrorMessage = 'Please select a valid destination!';
}
