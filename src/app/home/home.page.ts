import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  nombre: string = '';
  adress: string = '';
  horaSeleccionada: string = '';
  buscandoChofer: boolean = false;
  choferes: any[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService
    ) {}

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
/*
  buscarChofer() {
    // Realiza una solicitud HTTP para obtener choferes activos
    this.apiService.getChoferesActivos().subscribe((data) => {
      // Filtra los usuarios de categoría "chofer" y "isActive = True"
      this.choferes = data.filter((usuario: { categoria: string; isActive: boolean; }) => usuario.categoria === 'chofer' && usuario.isActive);
    });
  }
*/

buscarChofer() {
  this.buscandoChofer = true;

  setTimeout(() => {
    // Simular un tiempo de espera de 4 segundos
    this.buscandoChofer = false;

    // Datos de choferes ficticios
    this.choferes = [
      {
        nombre: 'María Rodríguez',
        sede: 'Antonio Varas',
        patente: 'XY987ZA',
        vehiculo: 'Marca2 Modelo2',
        color: 'Azul',
      },
      {
        nombre: 'Martín Torres',
        sede: 'Padre Alonso de Ovalle',
        patente: 'JK321UW',
        vehiculo: 'Marca5 Modelo5',
        color: 'Blanco',
      },
    ];
  }, 4000);
}


  cerrarSesion() {
    // Redirige al usuario a la página de inicio de sesión (login)
    this.router.navigate(['/login']);
  }
}
