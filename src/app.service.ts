import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World From Docker, mother-f..er! You should know better...';
  }
}
