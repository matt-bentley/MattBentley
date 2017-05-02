import { Component } from '@angular/core';
import { routerTransition, hostStyle } from '../router.animations';
import { MdDialog } from '@angular/material';
import { DialogElementsExampleDialog } from './home-dialog.component';

@Component({
  selector: 'appc-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  animations: [routerTransition()],
  // tslint:disable-next-line:use-host-property-decorator
  host: hostStyle()
})
export class HomeComponent {
   constructor(public dialog: MdDialog) { }

   openDialog() {
      this.dialog.open(DialogElementsExampleDialog);
   }  

   folders = [
      {
         name: 'Photos',
         updated: new Date('1/1/16'),
      },
      {
         name: 'Recipes',
         updated: new Date('1/17/16'),
      },
      {
         name: 'Work',
         updated: new Date('1/28/16'),
      }
   ];
   notes = [
      {
         name: 'Vacation Itinerary',
         updated: new Date('2/20/16'),
      },
      {
         name: 'Kitchen Remodel',
         updated: new Date('1/18/16'),
      }
   ];

   tiles = [
      { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
      { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
      { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
      { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
   ];

   city: string = '';
}
