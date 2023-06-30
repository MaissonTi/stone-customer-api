import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CustomerInputDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNumber()
  document: number;
}

export class CustomerOutputDTO {
  @ApiProperty({ example: 'a4816643-049b-4e25-a182-5ee3fc9428c0', type: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Maisson' })
  name: string;

  @ApiProperty({ example: '123456' })
  document: number;
}
