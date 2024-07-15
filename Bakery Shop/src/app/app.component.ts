import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, animate, style, group, query, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        query(':enter, :leave', style({ opacity: 1 }), { optional: true }),
        group([
          query(':enter', [
            style({ opacity: 1}),
            animate('0.4s ease-in-out', style({ opacity: 0}))
          ], { optional: true }),
          query(':leave', [
            style({ opacity: 1}),
            animate('0.4s ease-in-out', style({ opacity: 0}))
          ], { optional: true }),
        ])
      ])
    ])
  ],
})
export class AppComponent {
  title = 'DoAn_v1';

  getState(outlet: RouterOutlet): string {
    return outlet.activatedRouteData['state'];
  }
}
