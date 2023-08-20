import { Injectable } from "@nestjs/common";

@Injectable()
export class LoggingService {

    test () {
        console.log("test")
    }
 
}
