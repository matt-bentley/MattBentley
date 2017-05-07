import { NgModule } from '@angular/core';
import { ShareModule } from '../shared/share.module';
import { SharedModule } from '../shared/shared.module';

import { ChatComponent } from './chat.component';
import { ChatDialog } from './chat-dialog.component';
import { NewChatDialog } from './new-chat-dialog.component';
import { ChatService } from './chat.service';
import { ChannelService, SignalrWindow } from "./channel.service";

import { routing } from './chat.routes';

@NgModule({
   imports: [
      ShareModule,
      SharedModule,
      routing
   ],
   declarations: [
      ChatComponent,
      ChatDialog,
      NewChatDialog
   ],
   providers: [
      ChatService,
      ChannelService,
      { provide: SignalrWindow, useValue: window }
   ],
   entryComponents: [ChatDialog, NewChatDialog]
})
export class ChatModule { }
