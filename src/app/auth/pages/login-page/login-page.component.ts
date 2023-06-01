import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  constructor(private _auth: AuthService, private _router: Router) {}

  public onLogin(): void {
    this._auth.login('Carlos@gmail.com', '123456').subscribe((user) => {
      this._router.navigate(['/']);
    });
  }
}
