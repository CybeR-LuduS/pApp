import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userType: string = '';
  username: string = '';
  nombre: string = '';

  userSede: string = '';
  userRut: string = '';
  userPatente: string = '';
  userMarca: string = '';
  userModelo: string = '';
  userColor: string = '';

  horaSalida: string = '';
  capacidadPasajeros: number = 0;
  precioPorPersona: number = 0;

  buscandoViaje: boolean = false;
  viajes: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

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

    if (this.userType == 'Chofer') {
      this.userSede = localStorage.getItem('userSede') || '';
      this.userRut = localStorage.getItem('userRut') || '';
      this.userPatente = localStorage.getItem('userPatente') || '';
      this.userMarca = localStorage.getItem('userMarca') || '';
      this.userModelo = localStorage.getItem('userModelo') || '';
      this.userColor = localStorage.getItem('userColor') || '';
    }

    this.printCurrentPosition(); // Llama a la función para obtener la geolocalización

  }

  /* Obtener coordenadas de geolocalización */
  async printCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
    } catch (error) {
      console.error('Error al obtener la geolocalización:', error);
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
      sede: this.userSede,
      rut: this.userRut,
      horaSalida: this.horaSalida,
      capacidadPasajeros: this.capacidadPasajeros,
      precioPorPersona: this.precioPorPersona,
      estadoViaje: 'Programado',

      patenteVehiculo: this.userPatente,
      marcaVehiculo: this.userMarca,
      modeloVehiculo: this.userModelo,
      colorVehiculo: this.userColor,
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
      }
    );
  }



  /* VISTA PASAJERO */

  buscarViaje() {
    this.buscandoViaje = true;

    setTimeout(() => {
      // Realiza una solicitud GET a la API de Django para obtener los viajes
      const apiUrl = 'http://127.0.0.1:8000/api/lista_viajes';

      this.http.get(apiUrl).subscribe(
        (response: any) => {
          console.log('Viajes obtenidos con éxito:', response);
          this.viajes = response; // Almacena los viajes en la propiedad viajes

          // Simular un tiempo de espera de 4 segundos antes de desactivar buscandoViaje

          this.buscandoViaje = false;

        },
        (error) => {
          console.error('Error al obtener los viajes:', error);
          this.buscandoViaje = false;
        }
      );
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
