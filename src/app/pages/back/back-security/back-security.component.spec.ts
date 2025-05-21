import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackSecurityComponent } from './back-security.component';

describe('BackSecurityComponent', () => {
  let component: BackSecurityComponent;
  let fixture: ComponentFixture<BackSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackSecurityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
