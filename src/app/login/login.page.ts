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
  ) {
    // Intenta cargar el usuario desde el almacenamiento local
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.username = user.username;
      this.password = user.password;
    }
  }

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
          // Guardar los datos del usuario en el almacenamiento local
          localStorage.setItem('user', JSON.stringify({ username: this.username, password: this.password }));
          localStorage.setItem('ingresado', 'true');
          
          // Crear un objeto NavigationExtras para pasar datos a la página de inicio
          const navigationExtras: NavigationExtras = {
            state: {
              username: this.username,
            },
          };

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
    // Limpia los valores de los campos y elimina los valores del almacenamiento local
    this.username = '';
    this.password = '';
    localStorage.removeItem('user');
    localStorage.removeItem('ingresado');
  }
}