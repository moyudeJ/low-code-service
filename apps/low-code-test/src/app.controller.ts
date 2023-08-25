import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { BusinessException } from './common/exceptions/business.exception.filter';

@Controller({
  path: 'user',
  version: '1',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  findAll() {
    return 'i am old one';
  }

  @Get()
  @Version('2')
  findAll2() {
    return 'i am new one';
  }

  @Get('findText')
  @Version([VERSION_NEUTRAL, '1'])
  findText() {
    return this.configService.get('TEST_VALUE').name;
  }

  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    const a: any = {};
    console.log(a.b.c);

    return this.appService.getHello();
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {};

    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了');
    }

    return this.appService.getHello();
  }
}
