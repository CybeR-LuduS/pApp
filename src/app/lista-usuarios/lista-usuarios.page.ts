import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {
  vehiculos: any[] = []; // Declarar una variable para almacenar los vehículos
  categorias: any[] = []; // Declarar una variable para almacenar las categorías
  usuarios: any[] = []; // Declarar una variable para almacenar los usuarios

  constructor(private api: ApiService) {
  }
  

  loadVehiculos(){
    this.api.getVehiculos().subscribe(
      (vehiculos)=>{
        this.vehiculos = vehiculos; // Asigna la respuesta de la API a la variable
        console.log(vehiculos);
      }
      ,
      (error)=>{
        console.log(error);
      }
    );
  }


  loadCategorias(){
    this.api.getCategorias().subscribe(
      (categorias)=>{
        this.categorias = categorias; // Asigna la respuesta de la API a la variable
        console.log(categorias);
      }
      ,
      (error)=>{
        console.log(error);
      }
    );
  }


  loadUsuarios(){
    this.api.getUsuarios().subscribe(
      (usuarios)=>{
        this.usuarios = usuarios; // Asigna la respuesta de la API a la variable
        console.log(usuarios);
      }
      ,
      (error)=>{
        console.log(error);
      }
    );
  }
  
  ngOnInit() {
  }
}
