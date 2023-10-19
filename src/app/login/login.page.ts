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

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  login() {
    // Crear un objeto NavigationExtras para pasar datos a la página de inicio
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username, // 
      },
    };

    // Almacenar el nombre de usuario en el servicio de autenticación
    this.authService.setUsername(this.username);

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
          // Inicio de sesión no válido, muestra un mensaje de error al usuario
          console.log('Credenciales inválidas (usuario y/o contraseña');
        }
      },
      (error) => {
        console.error('Error al ingresar', error);
      }
    );
  }
}

