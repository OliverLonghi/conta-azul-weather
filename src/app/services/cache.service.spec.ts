import { TestBed, inject, async } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService]
    });
  });

  it('should be created', inject([CacheService], (service: CacheService) => {
    expect(service).toBeTruthy();
  }));

  it('should set timeout correctly', inject([CacheService], (service: CacheService) => {
    service.setTimeout(1000);
    expect(service.timeout).toBe(1000);
  }));

  it('should use cached value', inject([CacheService], (service: CacheService) => {
    service.setTimeout(100);
    service.setValue('key', 'val');
    let val = service.getValue('key');
    expect(val).toBe('val');    
  }));

  it('should not use cached value', async(inject([CacheService], (service: CacheService) => {
    service.setTimeout(100);
    service.setValue('key', 'val');
    setTimeout(() => {
      let val = service.getValue('key');
      expect(val).toBe(null);
    },200)
  })));
  
});
