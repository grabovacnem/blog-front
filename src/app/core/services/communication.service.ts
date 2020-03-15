import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class CommunicationService {

  public actionMessage: Subject<any> = new Subject();

  constructor() {
  }

}
