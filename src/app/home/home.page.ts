import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = ''; // Valor según inicio de sesión
  adress: string= '';

  buscandoChofer = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state;

      if (state && state["username"]) {
        this.username = state["username"];
      }
    }
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

  listaUsuarios() {
    this.router.navigate(['/lista-usuarios']);
  }
}
