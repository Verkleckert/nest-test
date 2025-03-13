import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {BaseService} from "./base/base.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly baseService: BaseService) {}

  @Get()
  async getHello(): Promise<string> {
    console.log('Hello')
    return this.appService.getHello();
  }
}
