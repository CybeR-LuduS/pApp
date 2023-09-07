import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {

  email: string = '';
  

  constructor(private router: Router, private authService: AuthService) {}

  login() {

    // Establecer el nombre de usuario en el servicio
    this.authService.setUsername(this.email);

    // Redirigir a la página de login
    this.router.navigate(['/login']);
  }


}
