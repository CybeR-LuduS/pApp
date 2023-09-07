import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = ''; // Valor según inicio de sesión
  adress: string= '';

  constructor(private authService: AuthService) {
    // Obtener el nombre de usuario del servicio y asignarlo a la variable username
    this.username = this.authService.getUsername();
  }
}
