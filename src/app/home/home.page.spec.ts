import { ComponentFixture, TestBed, waitForAsync, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Geolocation } from '@capacitor/geolocation';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiService: ApiService;

  let emailComposerStub = {
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), HttpClientModule,MatToolbarModule,
      MatIconModule, MatDialogModule],
      providers: [
        { provide: EmailComposer, useValue: emailComposerStub } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('debería limpiar localStorage y redirigir al usuario a la página de inicio de sesión', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(component.router, 'navigate');
  
    component.cerrarSesion();
  
    expect(localStorage.removeItem).toHaveBeenCalledWith('ingresado');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userType');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userCorreo');
    expect(component.router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('debería inicializar userType y userCorreo desde localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValues('Chofer', 'test@example.com');
    component.ngOnInit();
    expect(component.userType).toEqual('Chofer');
    expect(component.userCorreo).toEqual('test@example.com');
  });
  
  it('debería llamar a obtenerViajeEnProgresoChofer en ngOnInit', () => {
    spyOn(component, 'obtenerViajeEnProgresoChofer');
    component.ngOnInit();
    expect(component.obtenerViajeEnProgresoChofer).toHaveBeenCalled();
  });
  
  it('debería dejar viajeEnProgresoChofer como null cuando no hay un viaje programado', () => {
    const mockViajes = [
      { estadoViaje: 'Finalizado', correoChofer: 'test@example.com' }
    ];
    spyOn(component.api, 'getViajes').and.returnValue(of(mockViajes));
  
    component.obtenerViajeEnProgresoChofer();
  
    expect(component.viajeEnProgresoChofer).toBeNull();
  });


});

