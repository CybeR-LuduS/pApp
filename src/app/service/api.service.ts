import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) { }

  getCategorias():Observable<any> {
    return this.http.get(this.apiURL+'/lista_categorias')
    .pipe(retry(3));
  }
}
