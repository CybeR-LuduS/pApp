import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar al método de inicio de sesión', async () => {
    spyOn(component, 'login');
    await fixture.whenStable();
    const buttons = el.queryAll(By.css('ion-button'));
    const loginButton = buttons.find(button => button.nativeElement.textContent.trim() === 'Ingresar');
    if (loginButton) {
      loginButton.triggerEventHandler('click', null);
      expect(component.login).toHaveBeenCalledTimes(1);
    } else {
      fail('No se encontró el botón de inicio de sesión');
    }
  });

  it('debería tener campos de entrada para el nombre de usuario y la contraseña', () => {
    const usernameInput = el.query(By.css('ion-input[data-cy=username-input]'));
    const passwordInput = el.query(By.css('ion-input[data-cy=password-input]'));
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('debería tener un botón para limpiar los campos', async () => {
    spyOn(component, 'limpiarCampos');
    await fixture.whenStable();
    const buttons = el.queryAll(By.css('ion-button'));
    const clearButton = buttons.find(button => button.nativeElement.textContent.trim() === 'Limpiar Campos');
    if (clearButton) {
      clearButton.triggerEventHandler('click', null);
      expect(component.limpiarCampos).toHaveBeenCalledTimes(1);
    } else {
      fail('No se encontró el botón para limpiar los campos');
    }
  });

  it('debería tener un enlace para recuperar la cuenta', () => {
    const recoverLink = el.query(By.css('a[routerLink="/recuperar"]'));
    expect(recoverLink).toBeTruthy();
  });

  it('debería mostrar un mensaje de error cuando el inicio de sesión falla', () => {
    component.errorMessage = 'Error de inicio de sesión';
    component.errorMessageVisible = true;
    fixture.detectChanges();
    const errorMessage = el.query(By.css('.error-message:not(.hidden)'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent.trim()).toBe('Error de inicio de sesión');
  });

});