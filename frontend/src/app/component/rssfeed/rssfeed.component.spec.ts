import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssfeedComponent } from './rssfeed.component';

describe('RssfeedComponent', () => {
  let component: RssfeedComponent;
  let fixture: ComponentFixture<RssfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RssfeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RssfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
