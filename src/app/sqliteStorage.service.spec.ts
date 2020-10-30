import { TestBed } from '@angular/core/testing';

import { SqliteStorageService } from './sqliteStorage.service';

describe('ErrorService', () => {
  let service: SqliteStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
