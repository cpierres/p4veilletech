import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackTestingFwkComponent } from './back-testing-fwk.component';

describe('BackTestingFwkComponent', () => {
  let component: BackTestingFwkComponent;
  let fixture: ComponentFixture<BackTestingFwkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackTestingFwkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackTestingFwkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
