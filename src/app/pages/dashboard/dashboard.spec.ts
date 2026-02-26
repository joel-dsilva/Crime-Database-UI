import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard'; // Matches your new Class name
import { CaseService } from '../../core/services/case.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  // 1. Create a Mock Service
  // This prevents the test from trying to connect to Supabase
  const mockCaseService = {
    getCasesWithDetails: () => of([]) // Returns an empty list observable
  };

  // 2. Create a Mock Router
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent], // Import the Standalone Component
      providers: [
        // Inject the Mocks instead of real services
        { provide: CaseService, useValue: mockCaseService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});