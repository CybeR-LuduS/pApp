import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  errorMessageVisible: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  
  login() {
    // Realizar una solicitud GET a la API de Django para validar el inicio de sesión
    const apiUrl = `http://127.0.0.1:8000/api/lista_usuarios`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        // Verificar si el usuario y la contraseña son válidos
        const users: any[] = response as any[];
        const user = users.find((u) => u.correo === this.username && u.contrasennia === this.password);
        
        if (user) {
          // Inicio de sesión válido
          
          // Establecer estado de sesión como 'ingresado' hasta cerrar sesión (en home)
          localStorage.setItem('ingresado', 'true');
          
          // Crear un objeto NavigationExtras para pasar datos a la página de inicio
          const navigationExtras: NavigationExtras = {
            state: {
              username: this.username,
            },
          };

          this.password = '';
          
          // Redirigir a la página de inicio
          this.router.navigate(['/home'], navigationExtras);

        } else {
          // Inicio de sesión no válido, establecer el mensaje de error y mostrarlo
          this.errorMessage = 'Credenciales inválidas (usuario y/o contraseña)';
          this.errorMessageVisible = true;

          // Ocultar el mensaje de error después de 3 segundos
          setTimeout(() => {
            this.errorMessageVisible = false;
          }, 3000);
        }
      },
      (error) => {
        console.error('Error al ingresar', error);
      }
    );
  }

  limpiarCampos() {
    // Limpia los valores de los campos
    this.username = '';
    this.password = '';
  }
}