import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackPresentationComponent } from './back-presentation.component';

describe('BackFwkComponent', () => {
  let component: BackPresentationComponent;
  let fixture: ComponentFixture<BackPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackPresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
