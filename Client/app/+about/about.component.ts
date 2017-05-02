import { Component, OnInit } from '@angular/core';
import { routerTransition, hostStyle, flyIn } from '../shared/animations/animations';

@Component({
  selector: 'appc-about',
  styleUrls: ['./about.component.scss'],
  templateUrl: './about.component.html',
  animations: [routerTransition(), flyIn],
  // tslint:disable-next-line:use-host-property-decorator
  host: hostStyle()
})
export class AboutComponent implements OnInit {
   constructor() { } 

   public panelState1: string = 'left';
   public panelState2: string = 'left';
   public panelState3: string = 'left';
   public panelState4: string = 'left';

   public openInNewTab(url: string): void {
      var win = window.open(url, '_blank');
      win.focus();
   }

   ngOnInit() {
      setTimeout(() => {
         this.panelState1 = this.panelState1 === 'left' ? 'right' : 'left';
      }, 400);
      setTimeout(() => {
         this.panelState2 = this.panelState2 === 'left' ? 'right' : 'left';
      }, 100);
      setTimeout(() => {
         this.panelState3 = this.panelState3 === 'left' ? 'right' : 'left';
      }, 800);
      setTimeout(() => {
         this.panelState4 = this.panelState4 === 'left' ? 'right' : 'left';
      }, 500);
   }
}
