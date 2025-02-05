import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssFrontComponent } from './rss-front.component';

describe('RssFrontComponent', () => {
  let component: RssFrontComponent;
  let fixture: ComponentFixture<RssFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RssFrontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RssFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
