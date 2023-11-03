import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userType: string = ''; 
  username: string = '';
  nombre: string = '';
  
  userRut: string = '';
  userPatente: string = '';

  buscandoChofer: boolean = false;
  choferes: any[] = [];

  horaSalida: string= '';
  capacidadPasajeros: number = 0;
  precioPorPersona: number = 0; 

  constructor(
    private router: Router,
    private http: HttpClient
    ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state;

      if (state && state["username"]) {
        this.username = state["username"];
        // Obtener el nombre de usuario a partir del correo electrónico
        this.nombre = this.extractUsername(this.username);
      }
    }

    // Obtener el tipo de usuario almacenado en el localStorage
    this.userType = localStorage.getItem('userType') || '';

    // Obtener los datos del usuario chofer para llenar campos de generarViaje()
    
    if (this.userType == 'Chofer'){
      this.userRut = localStorage.getItem('userRut') || '';
      this.userPatente = localStorage.getItem('userPatente') || '';
    }
  }

  /* VISTA GENERAL */
  // Para extraer el nombre de usuario
  extractUsername(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.slice(0, atIndex);
    }
    return email;
  }


  /* VISTA CHOFER */
  generarViaje() {
    // Lógica para crear un viaje con los datos proporcionados
    const viaje = {
      rutConductor: this.userRut,
      horaSalida: this.horaSalida,
      capacidadPasajeros: this.capacidadPasajeros,
      precioPorPersona: this.precioPorPersona,
      patenteVehiculo: this.userPatente,
      estadoViaje: 'Programado'
    };

    const apiUrl = 'http://127.0.0.1:8000/api/lista_viajes';

    // Realizar una solicitud POST para crear el viaje
    this.http.post(apiUrl, viaje).subscribe(
      (response: any) => {
        console.log('Viaje creado con éxito:', response);

        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al crear el viaje:', error);
        // Manejar errores aquí si es necesario
      }
    );

  }



  /* VISTA PASAJERO */
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
    // Elimina la bandera que indica que la sesión está abierta
    localStorage.removeItem('ingresado');

    // Eliminación localStorage de tipo de usuario y, si es chofer, de rut y patente
    localStorage.removeItem('userType');

    if (this.userType === 'Chofer') {
      localStorage.removeItem('userRut');
      localStorage.removeItem('userPatente');
    }

    // Redirige al usuario a la página de inicio de sesión (login)
    this.router.navigate(['/login']);
  }
}
