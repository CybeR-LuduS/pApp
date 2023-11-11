import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../service/api.service';

import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userType: string = '';
  userCorreo: string = '';
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
    private api: ApiService,
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

    // Obtener el tipo de usuario y correo almacenado en el localStorage
    this.userType = localStorage.getItem('userType') || '';
    this.userCorreo = localStorage.getItem('userCorreo') || '';

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
      correoChofer: this.userCorreo,
    };

    // Realizar una solicitud POST para crear el viaje
    this.api.createViaje(viaje).subscribe((success) => {
        console.log(success);

        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /* Falta generar mensaje de confirmación de creación de viaje y que cambie la vista del usuario chofer */


  /* VISTA PASAJERO */

  buscarViaje() {
    this.buscandoViaje = true;

    setTimeout(() => {
      this.api.getViajes().subscribe((res) =>{
          console.log(res[0]);
          this.viajes = res; // Almacena los viajes en la propiedad viajes

          // Simular un tiempo de espera de 4 segundos antes de desactivar buscandoViaje
          this.buscandoViaje = false;

        },
        (error) => {
          console.log(error);
          this.buscandoViaje = false;
        }
      );
    }, 4000);
  }

  // Falta crear y desarrollar función seleccionarViaje() y mensaje de confirmación
  /* Al seleccionar el viaje, se almacena el correo del pasajero en una variable. Luego, se activa la funcionalidad de 
  enviar correo de confirmación a los correos de pasajero y chofer, con distintos mensajes */


  cerrarSesion() {
    // Elimina la bandera que indica que la sesión está abierta
    localStorage.removeItem('ingresado');

    // Eliminación localStorage de tipo de usuario, correo y, si es chofer, de rut y patente
    localStorage.removeItem('userType');
    localStorage.removeItem('userCorreo');

    if (this.userType === 'Chofer') {
      localStorage.removeItem('userRut');
      localStorage.removeItem('userPatente');
    }

  // Borra la lista de viajes en la interfaz de usuario
  this.viajes = [];

    // Redirige al usuario a la página de inicio de sesión (login)
    this.router.navigate(['/login']);
  }
}
