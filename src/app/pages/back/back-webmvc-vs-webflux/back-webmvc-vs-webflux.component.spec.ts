import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackWebmvcVsWebfluxComponent } from './back-webmvc-vs-webflux.component';

describe('BackWebmvcWebfluxComponent', () => {
  let component: BackWebmvcVsWebfluxComponent;
  let fixture: ComponentFixture<BackWebmvcVsWebfluxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackWebmvcVsWebfluxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackWebmvcVsWebfluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
