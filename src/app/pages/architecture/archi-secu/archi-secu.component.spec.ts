import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiSecuComponent } from './archi-secu.component';

describe('ArchiSecuComponent', () => {
  let component: ArchiSecuComponent;
  let fixture: ComponentFixture<ArchiSecuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiSecuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiSecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
