import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  LogIn = () => {

    this.authService.LogIn()
      .subscribe(res => {
        if (res.id) {
          this.router.navigate(['./heroes']);
        }
      })
  }

  NoLogIn = () => {
    this.authService.LogOut();
    this.router.navigate(['./heroes']);
  }
}
