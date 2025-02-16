import { TestBed } from '@angular/core/testing';

import { LinksInfoService } from './links-info.service';

describe('LinksInfoService', () => {
  let service: LinksInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinksInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
