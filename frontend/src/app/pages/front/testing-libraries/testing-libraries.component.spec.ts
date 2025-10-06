import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingLibrariesComponent } from './testing-libraries.component';

describe('TestingLibrariesComponent', () => {
  let component: TestingLibrariesComponent;
  let fixture: ComponentFixture<TestingLibrariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingLibrariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingLibrariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
