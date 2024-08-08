import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userName: string = '';
  constructor(private userService: UserService) {
    this.userService.getUserById(environment.userIdTest).subscribe((data) => {
      this.userName = data.firstname + ' ' + data.lastname;
    });
  }
}
