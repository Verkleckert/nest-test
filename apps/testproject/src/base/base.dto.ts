
import { IsOptional } from 'class-validator';
import {_IsUsername} from "@testlib/testlib";

export class BaseDto {
    @IsOptional()
    @_IsUsername()
    username?: string;
}
