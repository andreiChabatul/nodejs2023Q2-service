import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { LoggingService } from './Logging.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { RefreshLoginDto } from './dto/refresh-login.dto';
import { Public } from './public';

@Public()
@Controller('auth')
export class LoggingController {
  constructor(private loggingService: LoggingService) { }

  
  @Post('signup')
  async registerUser(@Res({ passthrough: true }) response: Response, @Body() loginUserDto: LoginUserDto) {
  
    const tokens = await this.loggingService.register(loginUserDto);
    
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    return tokens.accessToken;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Res({ passthrough: true }) response: Response, @Body() loginUserDto: LoginUserDto) {
    
    const tokens = await this.loggingService.login(loginUserDto);
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    console.log('login', tokens)
    return tokens.accessToken;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshUser(@Res({ passthrough: true }) response: Response, @Body() refreshLoginDto: RefreshLoginDto) {
    const tokens = await this.loggingService.refresh(refreshLoginDto);
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    return tokens;
  }
}
