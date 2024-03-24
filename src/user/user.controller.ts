import { Body, Controller, Get } from '@nestjs/common';
import { GetAuth } from 'src/auth/dto/get-auth.dto';

@Controller('user')
export class UserController {
    @Get()
    getHello(@Body('auth') auth: GetAuth): object {
        return {"message": "Hello " + auth.username}
    }
}