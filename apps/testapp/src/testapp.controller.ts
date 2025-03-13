import {Controller, Get, Param} from '@nestjs/common';
import {TestappService} from "./testapp.service";

@Controller()
export class TestappController {
    constructor(private readonly testAppService: TestappService) {
    }

    @Get("testapp/:uuid")
    async run(@Param("uuid") uuid: string) {
        return await this.testAppService.runEntityTest(uuid);
    }
}
