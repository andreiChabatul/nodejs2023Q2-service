import { Body, Controller, Post } from '@nestjs/common';
import { LoggingService } from './Logging.service';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('auth')
export class LoggingController {
    constructor(private loggingService: LoggingService) { }

    @Post("/signup")
    async registerUser(@Body() loginUserDto: LoginUserDto) {
      return;
    }

    @Post("/login")
    async loginUser(@Body() loginUserDto: LoginUserDto) {
      return;
    }

    @Post("/refresh")
    async refreshUser() {
      return;
    }
}
