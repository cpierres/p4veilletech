import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackMicroservicesComponent } from './back-microservices.component';

describe('BackMicroservicesComponent', () => {
  let component: BackMicroservicesComponent;
  let fixture: ComponentFixture<BackMicroservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackMicroservicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackMicroservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
