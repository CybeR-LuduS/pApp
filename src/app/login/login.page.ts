import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {

    // Establecer el nombre de usuario en el servicio
    this.authService.setUsername(this.username);

    // Redirigir a la página home
    this.router.navigate(['/home']);
  }


}
