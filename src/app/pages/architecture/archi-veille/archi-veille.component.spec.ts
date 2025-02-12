import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiVeilleComponent } from './archi-veille.component';

describe('ArchiVeilleComponent', () => {
  let component: ArchiVeilleComponent;
  let fixture: ComponentFixture<ArchiVeilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiVeilleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiVeilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
