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

  buscandoChofer = false;

  constructor(private authService: AuthService) {
    // Obtener el nombre de usuario del servicio y asignarlo a la variable username
    this.username = this.authService.getUsername();
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
}
