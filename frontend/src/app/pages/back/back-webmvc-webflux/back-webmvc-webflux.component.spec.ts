import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackWebmvcWebfluxComponent } from './back-webmvc-webflux.component';

describe('BackWebmvcWebfluxComponent', () => {
  let component: BackWebmvcWebfluxComponent;
  let fixture: ComponentFixture<BackWebmvcWebfluxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackWebmvcWebfluxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackWebmvcWebfluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
