import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [],
})
export class LayoutPageComponent {
  public sidebarItem = [
    {
      label: 'Listado',
      icon: 'label',
      url: './list',
    },
    {
      label: 'añadir',
      icon: 'add',
      url: './new-hero',
    },
    {
      label: 'Buscar',
      icon: 'search',
      url: './search-hero',
    },
  ];

  constructor(private _auth: AuthService, private _router: Router) {}

  get user(): User | undefined {
    return this._auth.currentUser;
  }

  public onLogout(): void {
    this._auth.logout();
    this._router.navigate(['auth/login']);
  }
}
