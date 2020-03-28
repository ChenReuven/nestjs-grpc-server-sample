import { Controller, Logger } from '@nestjs/common';
import { MathService } from './math.service';
import { GrpcMethod } from '@nestjs/microservices';

interface INumberArray {
  //      <--
  data: number[]; //             <--   Add these
} //                             <--   two
interface ISumOfNumberArray {
  // <--   interfaces
  sum: number; //                <--
} //                             <--

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(private mathService: MathService) {}

  @GrpcMethod('AppController', 'Accumulate') // <--  to this

  //
  // async accumulate(data: number[])  {
  //   this.logger.log('Adding ' + data.toString());
  //   return this.mathService.accumulate(data);
  // }
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray {
    this.logger.log(`Adding ${numberArray.data.toString()}`);
    return { sum: this.mathService.accumulate(numberArray.data) };
  }
}
