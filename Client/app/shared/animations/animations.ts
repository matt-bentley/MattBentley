import { trigger, animate, style, transition, state, keyframes } from '@angular/animations';

export function routerTransition() {
   return trigger('routerTransition', [
      transition('void => *', [
         style({
            transform: 'translateX(-15px)',
            opacity: 0
         }),
         animate(400)
      ])
   ]);
}

export function hostStyle() {
   return {
      '[@routerTransition]': '',
      '[style.display]': '"block"',

      // '[style.position]': '"absolute"'
   };
}

export const flyIn =
   trigger('flyIn', [
      state('right', style({
         transform: 'translateX(0)',
         opacity: 1
      })),
      state('left', style({
         transform: 'translateX(-40px)',
         opacity: 0
      })),
      transition('left => right', [
         animate(500, keyframes([
            style({ transform: 'translateX(-40px)', opacity: 0, offset: 0 }),
            style({ transform: 'translateX(-5px)', opacity: 1, offset: 0.75 }),
            style({ transform: 'translateX(0)', opacity: 1, offset: 1 })
         ]))
      ])
   ]);

export const pop =
   trigger('pop', [
      state('in', style({
         transform: 'scale(1)',
         opacity: 1
      })),
      transition('void => *', animate('300ms ease-out', keyframes([
         style({ transform: 'scale(0)', offset: 0 }),
         style({ transform: 'scale(1.15)', offset: 0.8 }),
         style({ transform: 'scale(1)', offset: 1 })
      ]))),
      transition('* => void', animate('300ms ease-in', keyframes([
         style({ transform: 'scale(1)', offset: 0 }),
         style({ transform: 'scale(1.15)', offset: 0.2 }),
         style({ transform: 'scale(0)', offset: 1 })
      ])))
   ]);

