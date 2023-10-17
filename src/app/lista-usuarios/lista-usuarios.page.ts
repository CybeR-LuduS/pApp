import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {

  categorias: any[] = []; // Declarar una variable para almacenar las categorías

  constructor(private api: ApiService) {
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
  
  ngOnInit() {
  }
}
