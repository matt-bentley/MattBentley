import { Component } from '@angular/core';
import { routerTransition, hostStyle } from '../shared/animations/animations';

@Component({
  selector: 'appc-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routerTransition()],
  // tslint:disable-next-line:use-host-property-decorator
  host: hostStyle()
})
export class ExamplesComponent { }
