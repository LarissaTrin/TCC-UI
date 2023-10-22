import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineBoardComponent } from './timeline-board.component';

describe('TimelineBoardComponent', () => {
  let component: TimelineBoardComponent;
  let fixture: ComponentFixture<TimelineBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
