import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayerComponent } from './dashboard-layer.component';

describe('DashboardLayerComponent', () => {
  let component: DashboardLayerComponent;
  let fixture: ComponentFixture<DashboardLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
