import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule] 
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('debería crear', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de viajes', () => {
    const mockViajes = [{ /*... viaje data ...*/ }];

    service.getViajes().subscribe(viajes => {
      expect(viajes).toEqual(mockViajes);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/api/lista_viajes');
    expect(req.request.method).toBe('GET');
    req.flush(mockViajes);
  });

  it('debería obtener la lista de usuarios', () => {
    const mockUsers = [{ /*... user data ...*/ }];

    service.getUsuarios().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/api/lista_usuarios');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('debería crear un nuevo viaje', () => {
    const mockViaje = { /*... viaje data ...*/ };

    service.createViaje(mockViaje).subscribe(response => {
      expect(response).toEqual(mockViaje);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/api/lista_viajes');
    expect(req.request.method).toBe('POST');
    req.flush(mockViaje);
  });

  it('debería actualizar un viaje existente', () => {
    const mockViaje = {
      _id: '123',  // Id ficticio para el viaje a actualizar
    };
  
    service.updateViaje(mockViaje).subscribe(response => {
      expect(response).toEqual(mockViaje);
    });
  
    const req = httpMock.expectOne(`http://127.0.0.1:8000/api/lista_viajes/${mockViaje._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockViaje);

    
  });

  it('debería eliminar un viaje existente', () => {
    const mockId = '123';  // Id ficticio para el viaje a eliminar
  
    service.deleteViaje(mockId).subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const req = httpMock.expectOne(`http://127.0.0.1:8000/api/lista_viajes/${mockId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

});