import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have stats initialized', () => {
    expect(component.stats).toBeDefined();
    expect(component.stats.totalProducts).toBe(0);
    expect(component.stats.totalOrders).toBe(0);
    expect(component.stats.totalRevenue).toBe(0);
    expect(component.stats.totalUsers).toBe(0);
  });
});
