import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = ''; // Valor según inicio de sesión
  nombre: string= '';
  adress: string= '';
  choferes: any[] = [];
  horaSeleccionada: string= '';

  buscandoChofer = false;

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

  buscarChofer() {
    // Realiza una solicitud HTTP para obtener choferes activos
    this.apiService.getChoferesActivos().subscribe((data) => {
      // Filtra los usuarios de categoría "chofer" y "isActive = True"
      this.choferes = data.filter((usuario: { categoria: string; isActive: boolean; }) => usuario.categoria === 'chofer' && usuario.isActive);
    });
  }

  cerrarSesion() {
    // Redirige al usuario a la página de inicio de sesión (login)
    this.router.navigate(['/login']);
  }
}
