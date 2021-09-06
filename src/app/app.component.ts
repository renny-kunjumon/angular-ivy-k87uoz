import { Component, VERSION } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  users: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get('users?page=1').subscribe(res => {
      this.users = res;
      console.log('data response', this.users);
    });
  }
}
