import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiPourContreComponent } from './archi-pour-contre.component';

describe('ArchiPourContreComponent', () => {
  let component: ArchiPourContreComponent;
  let fixture: ComponentFixture<ArchiPourContreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiPourContreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiPourContreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
