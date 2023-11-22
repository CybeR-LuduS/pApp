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

});