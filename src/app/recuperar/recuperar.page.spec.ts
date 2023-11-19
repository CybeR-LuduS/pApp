import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RecuperarPage } from './recuperar.page';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

describe('RecuperarPage', () => {
  let component: RecuperarPage;
  let fixture: ComponentFixture<RecuperarPage>;
  let el: DebugElement;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarPage],
      imports: [IonicModule.forRoot(), HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: AuthService, useValue: { setUsername: jasmine.createSpy('setUsername') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarPage);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the login method', () => {
    spyOn(component, 'login');
    el.query(By.css('ion-button')).triggerEventHandler('click', null);
    expect(component.login).toHaveBeenCalledTimes(1);
  });

  it('should set username in AuthService and navigate to /login', () => {
    component.email = 'test@example.com';
    component.login();
    expect(authService.setUsername).toHaveBeenCalledWith('test@example.com');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});