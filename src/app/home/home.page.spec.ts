import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { MatDialogModule } from '@angular/material/dialog';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

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
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });
});