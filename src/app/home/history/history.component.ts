import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PeriodsService } from '../../shared/services/periods.service';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-history',
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  periods = signal<any[]>([]);
  total = signal(0);

  page = signal(0);
  limit = signal(10);

  columns = ['id'];

  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private service: PeriodsService) {
    this.filterForm = this.fb.group({
      startDate: [null],
      endDate: [null],
    });

    this.loadData();
  }

  loadData() {
    const startDate: Date | null = this.filterForm.value.startDate;
    const endDate: Date | null = this.filterForm.value.endDate;

    const start = startDate?.toISOString() ?? '';
    const end = endDate?.toISOString() ?? '';

    this.service
      .mockGetPeriods('user1', start, end, this.page() + 1, this.limit())
      .subscribe((res) => {
        this.periods.set(res.data);
        this.total.set(res.total);
      });
  }

  onPageChange(event: PageEvent) {
    this.page.set(event.pageIndex);
    this.limit.set(event.pageSize);
    this.loadData();
  }
}
