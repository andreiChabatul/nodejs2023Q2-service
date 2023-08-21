import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoggingService } from './Logging.service';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('auth')
export class LoggingController {
  constructor(private loggingService: LoggingService) { }

  @Post("/signup")
  async registerUser(@Body() loginUserDto: LoginUserDto) {
    return this.loggingService.register(loginUserDto);
  }

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.loggingService.register(loginUserDto);
  }

  @Post("/refresh")
  async refreshUser() {
    return;
  }
}
