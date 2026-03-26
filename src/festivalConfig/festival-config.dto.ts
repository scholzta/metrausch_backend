import { IsDate, IsString, IsBoolean, IsOptional, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateConfigDto {
  @IsString()
  location: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
