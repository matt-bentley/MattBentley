import { Component, OnInit } from '@angular/core';

import { ChatService } from './chat.service';
import { ProfileService } from '../+profile/profile.service';
import { ChangeNameModel } from '../+profile/changename/change-name.model';
import { AccountService } from '../core/account/account.service';

import { ChatRoom } from './models/chat-room-model';

@Component({
   selector: 'new-chat-dialog',
   templateUrl: './new-chat-dialog.component.html',
})
export class NewChatDialog implements OnInit {

   constructor(private _profileService: ProfileService,
               private _accountService: AccountService,
               private _chatService: ChatService) { }

   private user: ChangeNameModel = new ChangeNameModel('Unknown', '');
   roomName: string;
   private chatRoom: ChatRoom;

   public addChatRoom(): void {
      if (this.roomName == "") {
         return;
      }
      let roomName = this.roomName;
      let userName = this.user.firstName;
      this._chatService.addChatRoom(roomName, userName)
         .subscribe((chatRoom: ChatRoom) => {
            this.chatRoom = chatRoom;
         });
   }

   ngOnInit() {
      if (this._accountService.isLoggedIn()) {
         this._profileService.userName()
            .subscribe((res: any) => {
               this.user.firstName = res.firstName;
               this.user.lastName = res.lastName;
            });
      }
   }
}
