import { Component, VERSION } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  users: any;
  subscriptionState: Array<Boolean> = [];
  observer: Subscription;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.observer = this.api.get('users?page=1').subscribe(res => {
      this.users = res;
      console.log('data response', this.users);
      this.subscriptionState.push(this.observer.closed);
    });

    let inc = 0;
    const timer = setInterval(() => {
      this.subscriptionState.push(this.observer.closed);
      if (inc > 5) {
        clearInterval(timer);
      }
      inc++;
    }, 2000);
  }
}
