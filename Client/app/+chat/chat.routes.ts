import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat.component';

const routes: Routes = [
   { path: '', component: ChatComponent }
];

export const routing = RouterModule.forChild(routes);
