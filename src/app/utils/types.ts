export interface QuoteLegDeparture {
  scheduled?: Date;
  actual?: Date;
  estimated?: Date;
}

export interface QuoteLegLocation {
  name: string;
  detailed_name: string;
  region_name: string;
}

export interface QuoteLeg {
  trip_uid: string;
  origin: QuoteLegLocation;
  destination: QuoteLegLocation;
  departure: QuoteLegDeparture;
}

export interface Quote {
  legs: Array<QuoteLeg>;
}
