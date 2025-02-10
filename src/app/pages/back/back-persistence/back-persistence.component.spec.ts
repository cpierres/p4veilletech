import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackPersistenceComponent } from './back-persistence.component';

describe('BackPersistenceComponent', () => {
  let component: BackPersistenceComponent;
  let fixture: ComponentFixture<BackPersistenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackPersistenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackPersistenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
