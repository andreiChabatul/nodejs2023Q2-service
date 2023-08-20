import { Module } from '@nestjs/common';
import { LoggingController } from './logging.controller';
import { LoggingService } from './Logging.service';


@Module({
  imports: [],
  controllers: [LoggingController],
  providers: [LoggingService],
})
export class LoggingModule {}
