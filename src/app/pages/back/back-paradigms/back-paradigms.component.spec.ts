import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackParadigmsComponent } from './back-paradigms.component';

describe('BackParadigmsComponent', () => {
  let component: BackParadigmsComponent;
  let fixture: ComponentFixture<BackParadigmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackParadigmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackParadigmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
