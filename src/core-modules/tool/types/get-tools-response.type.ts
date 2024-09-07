import { ApiProperty } from '@nestjs/swagger';

class Geolocation {
  @ApiProperty()
  lng: number;

  @ApiProperty()
  lat: number;
}

class CreatedOn {
  @ApiProperty()
  _seconds: number;

  @ApiProperty()
  _nanoseconds: number;
}

export class ToolListResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  isAvailable: boolean;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isOperatorAvailable: boolean;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  createdOn: CreatedOn;

  @ApiProperty()
  priceDaily: number;

  @ApiProperty()
  mainImageIdx: number;

  @ApiProperty()
  priceWeekly: number;

  @ApiProperty()
  _geoloc: Geolocation;

  @ApiProperty()
  insuranceId: string;

  @ApiProperty()
  isOwnerApproved: boolean;

  @ApiProperty()
  model: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  category1: string;

  @ApiProperty()
  category2: string;

  @ApiProperty()
  category3: string;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  marketValue: string;

  @ApiProperty()
  priceMonthly: number;

  @ApiProperty()
  isDeliveryAvailable: boolean;

  @ApiProperty()
  streetAddress: string;

  @ApiProperty()
  availableAfter: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  availableBefore: number;

  @ApiProperty()
  hasInsurance: boolean;
}
