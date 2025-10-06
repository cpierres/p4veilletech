import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackVeilleComponent } from './back-veille.component';

describe('BackVeilleComponent', () => {
  let component: BackVeilleComponent;
  let fixture: ComponentFixture<BackVeilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackVeilleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackVeilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
