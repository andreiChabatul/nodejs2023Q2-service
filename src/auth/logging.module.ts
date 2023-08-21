import { Module } from '@nestjs/common';
import { LoggingController } from './logging.controller';
import { LoggingService } from './Logging.service';
import { TokenService } from './token.service';


@Module({
  imports: [],
  controllers: [LoggingController],
  providers: [LoggingService, TokenService],
})
export class LoggingModule {}
