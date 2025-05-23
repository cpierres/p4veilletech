import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdemyComponent } from './udemy.component';

describe('UdemyComponent', () => {
  let component: UdemyComponent;
  let fixture: ComponentFixture<UdemyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UdemyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
