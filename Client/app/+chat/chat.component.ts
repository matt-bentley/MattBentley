import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { routerTransition, hostStyle, flyIn } from '../shared/animations/animations';
import { ChatDialog } from './chat-dialog.component';
import { NewChatDialog } from './new-chat-dialog.component';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { ChatService } from './chat.service';
import { ChatRoom } from './models/chat-room-model';
import { ChannelService, ConnectionState } from "./channel.service";

@Component({
  selector: 'appc-chat',
  styleUrls: ['./chat.component.scss'],
  templateUrl: './chat.component.html',
  animations: [routerTransition(), flyIn],
  // tslint:disable-next-line:use-host-property-decorator
  host: hostStyle()
})
export class ChatComponent implements OnInit {
   constructor(private _chatService: ChatService,
               private _newChatDialog: MdDialog,
               private _chatDialog: MdDialog,
               private channelService: ChannelService) {
      this.connectionState$ = this.channelService.connectionState$
         .map((state: ConnectionState) => { return ConnectionState[state]; });

      this.channelService.error$.subscribe(
         (error: any) => { console.warn(error); },
         (error: any) => { console.error("errors$ error", error); }
      );

      this.channelService.starting$.subscribe(
         () => { console.log("signalr service has been started"); },
         () => { console.warn("signalr service failed to start!"); }
      );

      this.chatRooms = new Array<ChatRoom>();
   } 

   public panelState1: string = 'left';
   public panelState2: string = 'left';
   public chatRooms: Array<ChatRoom>;
   private connectionState$: Observable<string>;
   public adminError: boolean = false;

   public openInNewTab(url: string): void {
      var win = window.open(url, '_blank');
      win.focus();
   }

   private setChats(chats: Array<ChatRoom>): void {
      this.chatRooms = chats;
   }

   public newChat(): void {
      this._newChatDialog.open(NewChatDialog);
   }

   public openChatRoom(chatRoom: ChatRoom): void {
      let config = new MdDialogConfig();
      let dialogRef: MdDialogRef<ChatDialog> = this._chatDialog.open(ChatDialog, config);
      dialogRef.componentInstance.chatRoom = chatRoom;
   }

   public openAdminRoom(): void {
      this._chatService.getAdminRoom()
         .subscribe((adminRoom: any) => {
            console.log(adminRoom.name);
            this.adminError = false;
            let room: ChatRoom = {
               Id: adminRoom.id,
               Name: adminRoom.name,
               CreatedBy: adminRoom.createdBy,
               CreatedDate: adminRoom.createdDate
            };
            this.openChatRoom(room);
         },
         (errors: any) => {
            console.log("Error getting admin key");
            this.adminError = true;
         });
   }

   public getChatRooms(): void {
      this._chatService.getChatRooms()
         .subscribe((c: Array<ChatRoom>) => {
            this.setChats(c);
         },
         (errors: any) => {
            console.log("Error getting chat rooms"); 
         });
   }

   ngOnInit() {
      setTimeout(() => {
         this.panelState1 = this.panelState1 === 'left' ? 'right' : 'left';
      }, 100);
      setTimeout(() => {
         this.panelState2 = this.panelState2 === 'left' ? 'right' : 'left';
      }, 600);

      this.getChatRooms();

      console.log("Starting the channel service");
      this.channelService.start();
   }
}
