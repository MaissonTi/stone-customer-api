import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Put,
  Post,
  ParseUUIDPipe,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ICreateCustomer } from '@src/domain/user-cases/create.customer.interface';
import { IFindCustomer } from '@src/domain/user-cases/find.customer.interface';
import { IUpdateCustomer } from '@src/domain/user-cases/update.customer.interface';
import { CustomerInputDTO, CustomerOutputDTO } from '../dtos/customer.dto';
import { CacheUnavailableError } from '@src/domain/protocols/errors/cache-unavailable.error';
import { SsoUnavailableError } from '@src/domain/protocols/errors/sso-unavailable.error';

@ApiTags('Customer')
@ApiBearerAuth()
@Controller('customer')
@ApiUnauthorizedResponse({ description: UnauthorizedException.name })
@ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: CacheUnavailableError.name })
@ApiResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: SsoUnavailableError.name })
export class CustomerController {
  constructor(
    @Inject('CreateCustomer')
    private readonly createCustomer: ICreateCustomer,

    @Inject('FindCustomer')
    private readonly findCustomer: IFindCustomer,

    @Inject('UpdateCustomer')
    private readonly updateCustomer: IUpdateCustomer,
  ) {}

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Show customer by Id (uuid)',
    description: 'This endpoint get a exists Customer by id in Cache',
  })
  @ApiNotFoundResponse({ description: 'CustomerNotFound!' })
  async find(@Param('id', new ParseUUIDPipe()) id: string): Promise<CustomerOutputDTO> {
    return this.findCustomer.execute({ id });
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new customer',
    description: 'This endpoint create a new Customer in Cache',
  })
  async create(@Body() payload: CustomerInputDTO): Promise<CustomerOutputDTO> {
    return this.createCustomer.execute(payload);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update a customer  by Id (uuid)',
    description: 'This endpoint update a Customer in Cache',
  })
  @ApiNotFoundResponse({ description: 'CustomerNotFound' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() payload: CustomerInputDTO,
  ): Promise<CustomerOutputDTO> {
    return this.updateCustomer.execute(id, payload);
  }
}
