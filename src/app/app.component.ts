import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  navigationClass: string;
  title = 'github-api';

  constructor(public route: Router) {
    this.route.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        this.replaceNavigationClass(event.url);
      }
    });
  }

  replaceNavigationClass(navigationClass: string) {
    let nClass = navigationClass;
    nClass = nClass.substr(1);

    if (nClass.indexOf('user') !== -1) {
      nClass = 'user';
    } else {
      nClass = 'home';
    }

    this.navigationClass = nClass;
  }
}
