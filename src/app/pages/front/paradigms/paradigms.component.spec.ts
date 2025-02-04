import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParadigmsComponent } from './paradigms.component';

describe('ParadigmsComponent', () => {
  let component: ParadigmsComponent;
  let fixture: ComponentFixture<ParadigmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParadigmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParadigmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
