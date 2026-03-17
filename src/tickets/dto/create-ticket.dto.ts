import { IsString, IsBoolean, IsOptional, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsOptional() @IsBoolean() early_arrival?: boolean;
  @IsOptional() @IsBoolean() entry_thursday?: boolean;
  @IsOptional() @IsBoolean() entry_friday?: boolean;
  @IsOptional() @IsBoolean() entry_saturday?: boolean;

  @IsOptional() @IsBoolean() catering_thursday?: boolean;
  @IsOptional() @IsBoolean() catering_friday?: boolean;
  @IsOptional() @IsBoolean() catering_saturday?: boolean;
  @IsOptional() @IsBoolean() catering_sunday?: boolean;

  @IsNumber() @IsNotEmpty() price: number;
}
