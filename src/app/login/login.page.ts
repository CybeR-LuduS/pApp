import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Variable para almacenar el mensaje de error
  errorMessageVisible: boolean = false; // Variable para controlar la visibilidad del mensaje de error

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  login() {
    // Crear un objeto NavigationExtras para pasar datos a la página de inicio
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username, // 
      },
    };


    // Realizar una solicitud GET a la API de Django para validar el inicio de sesión
    const apiUrl = `http://127.0.0.1:8000/api/lista_usuarios`;
    this.http.get(apiUrl).subscribe(
      (response) => {
        // Verificar si el usuario y la contraseña son válidos
        const users: any[] = response as any[];
        const user = users.find((u) => u.correo === this.username && u.contrasennia === this.password);
        
        if (user) {
          // Inicio de sesión válido, puedes redirigir a la página de inicio o realizar otras acciones
          this.router.navigate(['/home'], navigationExtras);
        } else {
          // Inicio de sesión no válido, establece el mensaje de error y muestra el mensaje
          this.errorMessage = 'Credenciales inválidas (usuario y/o contraseña)';
          this.errorMessageVisible = true;

          // Ocultar el mensaje de error después de 3 segundos
          setTimeout(() => {
            this.errorMessageVisible = false;
          }, 3000); // 3000 milisegundos (3 segundos)          
        }
      },
      (error) => {
        console.error('Error al ingresar', error);
      }
    );
  }
}

