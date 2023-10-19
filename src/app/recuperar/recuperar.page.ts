import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {

  email: string = '';
  nuevaContrasenna: string = ''; // Agrega un campo para la nueva contraseña

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  recuperarContrasenna() {
    const correoUsuario = this.email;
    const contrasennia = this.nuevaContrasenna; // Cambia a "contrasennia" para coincidir con Django
  
    const data = {
      contrasennia: contrasennia, // Modifica el nombre al atributo correcto de Django
    };
  
    // Realiza una solicitud PUT a la API de Django para cambiar la contraseña
    this.http.put(`http://127.0.0.1:8000/api/actualizar-usuario/${correoUsuario}/`, data)
      .subscribe((response) => {
        console.log('Contraseña actualizada con éxito', response);
        // Redirige a la página de inicio de sesión o muestra un mensaje de éxito
      }, (error) => {
        console.error('Error al actualizar la contraseña', error);
        // Muestra un mensaje de error al usuario
      });
  }

}