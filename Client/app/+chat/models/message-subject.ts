import { Subject } from "rxjs/Subject";
import { MessageEvent } from './message-event-model';

export class MessageSubject {
   channel: string;
   subject: Subject<MessageEvent>;
}
