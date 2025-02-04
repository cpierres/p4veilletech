import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackFwkComponent } from './back-fwk.component';

describe('BackFwkComponent', () => {
  let component: BackFwkComponent;
  let fixture: ComponentFixture<BackFwkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackFwkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackFwkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
