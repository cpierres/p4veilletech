import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypologieTestsComponent } from './typologie-tests.component';

describe('TypologieTestsComponent', () => {
  let component: TypologieTestsComponent;
  let fixture: ComponentFixture<TypologieTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypologieTestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypologieTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
