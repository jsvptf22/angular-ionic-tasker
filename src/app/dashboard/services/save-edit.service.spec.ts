import { TestBed } from '@angular/core/testing';

import { SaveEditService } from './save-edit.service';

describe('SaveEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveEditService = TestBed.get(SaveEditService);
    expect(service).toBeTruthy();
  });
});
