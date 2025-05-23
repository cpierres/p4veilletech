import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetsOcrComponent } from './projets-ocr.component';

describe('ProjetsOcrComponent', () => {
  let component: ProjetsOcrComponent;
  let fixture: ComponentFixture<ProjetsOcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetsOcrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetsOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
