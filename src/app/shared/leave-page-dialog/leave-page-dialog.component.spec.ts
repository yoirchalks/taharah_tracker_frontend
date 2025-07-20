import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavePageDialogComponent } from './leave-page-dialog.component';

describe('LeavePageDialogComponent', () => {
  let component: LeavePageDialogComponent;
  let fixture: ComponentFixture<LeavePageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeavePageDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavePageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
