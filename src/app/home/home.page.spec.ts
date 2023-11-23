import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let emailComposerStub = {
  };

  let router = {
    navigate: jasmine.createSpy('navigate'),
    getCurrentNavigation: jasmine.createSpy('getCurrentNavigation').and.returnValue(null) 
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), HttpClientModule,MatToolbarModule,
      MatIconModule, MatDialogModule],
      providers: [
        { provide: EmailComposer, useValue: emailComposerStub },
        { provide: Router, useValue: router } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el nombre del usuario', () => {
    component.nombre = 'Juan';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.username-text').textContent).toContain('Juan');
  });
  
  it('debería mostrar el tipo de usuario', () => {
    component.userType = 'Chofer';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.user-type').textContent).toContain('Chofer');
  });
  
  it('debería mostrar el formulario de viaje para el chofer si no hay un viaje en progreso', () => {
    component.userType = 'Chofer';
    component.viajeEnProgresoChofer = null;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.form')).toBeTruthy();
  });
  
  it('debería llamar a la función generarViaje() cuando se hace clic en el botón Programar Viaje', () => {
    component.userType = 'Chofer';
    fixture.detectChanges();
    spyOn(component, 'generarViaje');
    const button = fixture.debugElement.query(By.css('ion-button'));
    button.triggerEventHandler('click', null);
    expect(component.generarViaje).toHaveBeenCalled();
  });
  
  it('debería mostrar el botón de buscar viaje cuando no hay un viaje en progreso', () => {
    component.userType = 'Pasajero';
    component.viajeEnProgresoPasajero = null;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ion-button').textContent).toContain('Buscar viaje');
  });
  
  it('debería mostrar la tabla de viajes disponibles cuando hay viajes disponibles', () => {
    component.userType = 'Pasajero';
    component.viajes = [
      {
        sede: 'Sede1',
        horaSalida: '10:00',
        marcaVehiculo: 'Marca1',
        modeloVehiculo: 'Modelo1',
        colorVehiculo: 'Color1',
        patenteVehiculo: 'Patente1',
        precioPorPersona: 2000
      },
    ];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('debería llamar a la función buscarViaje() cuando se hace clic en el botón Buscar viaje', () => {
    component.userType = 'Pasajero';
    fixture.detectChanges();
    spyOn(component, 'buscarViaje');
    const button = fixture.debugElement.query(By.css('ion-button'));
    button.triggerEventHandler('click', null);
    expect(component.buscarViaje).toHaveBeenCalled();
  });


  it('debería cerrar la sesión y redirigir al usuario a la página de inicio de sesión', () => {
    spyOn(localStorage, 'removeItem');
    component.userType = 'Chofer';
    component.cerrarSesion();
    expect(localStorage.removeItem).toHaveBeenCalledWith('ingresado');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userType');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userCorreo');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userRut');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userPatente');
    expect(component.viajes.length).toBe(0);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
  
  it('debería llamar a la función cerrarSesionDialogo() cuando se hace clic en el botón de cerrar sesión', () => {
    fixture.detectChanges();
    spyOn(component, 'cerrarSesionDialogo');
    const button = fixture.debugElement.query(By.css('button[aria-label="Cerrar sesión"]'));
    button.triggerEventHandler('click', null);
    expect(component.cerrarSesionDialogo).toHaveBeenCalled();
  });

});