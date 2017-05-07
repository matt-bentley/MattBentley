import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from "rxjs/Subject";

import { ChannelService } from './channel.service';

import { ChatRoom } from './models/chat-room-model';
import { MessageEvent } from './models/message-event-model';

@Injectable()
export class ChatService {

   constructor(private _http: Http, private _channelService: ChannelService) { }

   private _apiUrl = 'http://localhost:56472/api/Chat/';
   private _newMessageSource = new Subject<MessageEvent>();

   public newMessage$ = this._newMessageSource.asObservable();

   private addNewMessage(message: MessageEvent) {
      this._newMessageSource.next(message);
   }

   public getChatRooms(): Observable<Array<ChatRoom>> {
      var headers = new Headers();
      headers.append("Content-Type", 'application/json');

      headers.append("Accept", 'application/json');

      var requestoptions = new RequestOptions({
         method: RequestMethod.Get,
         url: this._apiUrl + 'GetRooms',
         headers: headers
      });

      return <Observable<Array<ChatRoom>>>this._http.request(new Request(requestoptions))
         .map((response: Response) => <Array<ChatRoom>>response.json())
         .catch(this.handleError);
   }

   public getAdminRoom(): Observable<ChatRoom> {
      var headers = new Headers();
      headers.append("Content-Type", 'application/json');

      headers.append("Accept", 'application/json');

      var requestoptions = new RequestOptions({
         method: RequestMethod.Get,
         url: 'api/Admin/GetAdminRoom',
         headers: headers
      });

      return <Observable<ChatRoom>>this._http.request(new Request(requestoptions))
         .map((response: Response) => <ChatRoom>response.json())
         .catch(this.handleError);
   }

   public addChatRoom(roomName: string, userName: string): Observable<ChatRoom> {
      var headers = new Headers();
      headers.append("Content-Type", 'application/json');

      headers.append("Accept", 'application/json');

      var requestoptions = new RequestOptions({
         method: RequestMethod.Post,
         url: this._apiUrl + "AddRoom/" + roomName + "/" + userName,
         headers: headers
      });

      return <Observable<ChatRoom>>this._http.request(new Request(requestoptions))
         .map((response: Response) => <ChatRoom>response.json())
         .catch(this.handleError);
   }

   public postMessage(message: string, userName: string, chatRoom: string): Observable<boolean> {
      var headers = new Headers();
      headers.append("Content-Type", 'application/json');

      headers.append("Accept", 'application/json');

      var requestoptions = new RequestOptions({
         method: RequestMethod.Post,
         url: this._apiUrl + "PostMessage/" + encodeURIComponent(message) + "/" + userName + "/" + chatRoom,
         headers: headers
      });

      return <Observable<boolean>>this._http.request(new Request(requestoptions))
         .map((response: Response) => true)
         .catch(this.handleError);
   }

   public joinChatRoom(chatRoom: ChatRoom): void {
      this._channelService.sub(chatRoom.Id).subscribe(
         (x: MessageEvent) => {
            this.addNewMessage(x);
         },
         (error: any) => {
            console.warn("Attempt to join channel failed!", error);
         }
      )
   }

   public leaveChatRoom(chatRoom: ChatRoom): void {
      this._channelService.unsubscribe(chatRoom.Id);
   }

   private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
   }

}