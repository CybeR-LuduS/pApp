import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = ''; // Valor según inicio de sesión
  nombre: string= '';
  adress: string= '';

  buscandoChofer = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state;

      if (state && state["username"]) {
        this.username = state["username"];
        // Obtén el nombre de usuario a partir del correo electrónico
        this.nombre = this.extractUsername(this.username);
      }
    }
  }


  // Para extraer el nombre de usuario
  extractUsername(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.slice(0, atIndex);
    }
    return email;
  }

  buscarChofer() {
    if (this.buscandoChofer) {
      // Detener la búsqueda si ya está en progreso
      this.buscandoChofer = false;
    } else {
      // Comenzar la búsqueda si no está en progreso
      this.buscandoChofer = true;
      // Iniciar la búsqueda real, por ejemplo, hacer una solicitud HTTP
      // Cuando la búsqueda termine, establece 'this.buscandoChofer = false;'
    }
  }

  cerrarSesion() {
    // Realiza las acciones necesarias para cerrar la sesión, como eliminar tokens de autenticación o borrar datos de usuario en el cliente.

    // Redirige al usuario a la página de inicio de sesión (login)
    this.router.navigate(['/login']);
  }
}
