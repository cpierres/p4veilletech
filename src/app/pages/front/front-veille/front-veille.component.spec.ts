import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontVeilleComponent } from './front-veille.component';

describe('FrontVeilleComponent', () => {
  let component: FrontVeilleComponent;
  let fixture: ComponentFixture<FrontVeilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontVeilleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontVeilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
