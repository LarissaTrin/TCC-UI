/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectUserService } from './projectUser.service';

describe('Service: ProjectUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectUserService]
    });
  });

  it('should ...', inject([ProjectUserService], (service: ProjectUserService) => {
    expect(service).toBeTruthy();
  }));
});
