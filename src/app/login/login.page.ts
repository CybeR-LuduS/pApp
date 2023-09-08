import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Crear un objeto NavigationExtras para pasar datos a la página de inicio
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username, // Puedes incluir más datos aquí si es necesario
      },
    };

    // Redirigir a la página home con los datos
    this.router.navigate(['/home'], navigationExtras);
  }
}
