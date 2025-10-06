import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssBackComponent } from './rss-back.component';

describe('RssBackComponent', () => {
  let component: RssBackComponent;
  let fixture: ComponentFixture<RssBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RssBackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RssBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
