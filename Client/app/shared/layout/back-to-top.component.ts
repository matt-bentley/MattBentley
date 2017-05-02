import { Component, HostListener, OnInit } from '@angular/core';
import { pop } from '../animations/animations';

@Component({
   selector: 'appc-back-to-top',
   styleUrls: ['./back-to-top.component.scss'],
   templateUrl: './back-to-top.component.html',
   animations: [
      pop
   ]
})
export class BackToTopComponent implements OnInit {

   @HostListener('window:scroll', ['$event'])
   track(event: Event) {
      if (!this.isScroll && this.win.pageYOffset > 0)
         this.isScroll = true;
      else if (this.win.pageYOffset == 0 && this.isScroll)
         this.isScroll = false;
   }

   private win: Window;
   public isScroll: boolean = false;

   constructor() {
      this.win = window;
   }

   private scrollTo(yPoint: number, duration: number) {
      setTimeout(() => {
         this.win.window.scrollTo(0, yPoint)
      }, duration);
      return;
   }
   public smoothScroll(eID: any) {
      var startY = this.currentYPosition();
      var stopY = 0;
      //var stopY = this.elmYPosition(eID);
      var distance = stopY > startY ? stopY - startY : startY - stopY;
      if (distance < 100) {
         this.win.window.scrollTo(0, stopY); return;
      }
      var speed = Math.round(distance / 300);
      if (speed >= 20) speed = 20;
      var step = Math.round(distance / 100);
      var leapY = stopY > startY ? startY + step : startY - step;
      var timer = 0;
      if (stopY > startY) {
         for (var i = startY; i < stopY; i += step) {
            this.scrollTo(leapY, timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
         } return;
      }
      for (var i = startY; i > stopY; i -= step) {
         this.scrollTo(leapY, timer * speed);
         leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
      }
   }
   private currentYPosition(): number {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset) return self.pageYOffset;
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop)
         return document.documentElement.scrollTop;
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) {
         return document.body.scrollTop;
      }      
      return 0;
   }
   //private elmYPosition(eID: any): any {
   //   var elm: any = document.getElementById(eID);
   //   var y: any = elm.offsetTop;
   //   var node: any = elm;
   //   while (node != null && node.offsetParent && node.offsetParent != document.body) {
   //      node = node.offsetParent;
   //      y += node.offsetTop;
   //   } return y;
   //}

   ngOnInit(): void {

   }
}
