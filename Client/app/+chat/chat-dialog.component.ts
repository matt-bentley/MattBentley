import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { ChatService } from './chat.service';
import { ProfileService } from '../+profile/profile.service';
import { ChangeNameModel } from '../+profile/changename/change-name.model';
import { AccountService } from '../core/account/account.service';

import { ChatRoom } from './models/chat-room-model';

@Component({
   selector: 'chat-dialog',
   templateUrl: './chat-dialog.component.html',
   styleUrls: ['./chat-dialog.component.scss'],
})
export class ChatDialog implements OnInit, OnDestroy {

   constructor(private _profileService: ProfileService,
               private _accountService: AccountService,
               private _chatService: ChatService) { }

   @ViewChild('chatContainer') private chatContainer: ElementRef;
   private user: ChangeNameModel = new ChangeNameModel('Unknown', 'User');
   private userName: string = this.user.firstName + " " + this.user.lastName;
   public chatRoom: ChatRoom;
   public message: string;
   public messages: Array<MessageEvent> = [];

   public sendMessage(): void {
      this._chatService.postMessage(this.message, this.userName, this.chatRoom.Id)
         .subscribe((res: any) => {
            console.log("Sent message to chat room");
         },
         error => {
            console.log(error);
         });

      this.message = "";    
   }

   private addMessageToChat(message: any): void {
      this.messages.push(message);
      setTimeout(() => {
         this.scrollToBottom();
      }, 1);
   }

   private scrollToBottom(): void {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
   }

   ngOnInit() {
      if (this._accountService.isLoggedIn()) {
         this._profileService.userName()
            .subscribe((res: any) => {
               this.user.firstName = res.firstName;
               this.user.lastName = res.lastName;
               this.userName = this.user.firstName + " " + this.user.lastName;
            });
      }

      this._chatService.joinChatRoom(this.chatRoom);

      this._chatService.newMessage$.subscribe(
         (message) => { this.addMessageToChat(message); },
         (error) => { console.warn(error); }
      );
   }

   ngOnDestroy() {
      this._chatService.leaveChatRoom(this.chatRoom);
   }
}
