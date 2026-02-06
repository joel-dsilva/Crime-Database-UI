import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

type CaseStatus = 'OPEN' | 'UNDER_INVESTIGATION' | 'CLOSED' | 'ARCHIVED';

type CaseRow = {
  id: string;
  title: string;
  type: string;
  status: CaseStatus;
  area: string;
  occurredAt: string; // yyyy-mm-dd
  priority: 1 | 2 | 3 | 4 | 5;
};

@Component({
  selector: 'app-cases-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './cases-list.html',
  styleUrls: ['./cases-list.scss'],
})
export class CasesList {
  q = new FormControl('');
  status = new FormControl<'ALL' | CaseStatus>('ALL');

  columns = ['id', 'title', 'type', 'status', 'priority', 'area', 'occurredAt', 'actions'];

  data: CaseRow[] = [
    { id: 'C-10231', title: 'Vehicle theft report', type: 'Theft', status: 'OPEN', area: 'Panaji', occurredAt: '2026-01-20', priority: 4 },
    { id: 'C-10212', title: 'Assault complaint', type: 'Assault', status: 'UNDER_INVESTIGATION', area: 'Mapusa', occurredAt: '2026-01-18', priority: 3 },
    { id: 'C-10198', title: 'Cyber fraud', type: 'Cybercrime', status: 'CLOSED', area: 'Margao', occurredAt: '2026-01-11', priority: 5 },
    { id: 'C-10177', title: 'Missing person report', type: 'Missing', status: 'OPEN', area: 'Vasco', occurredAt: '2026-01-09', priority: 5 },
    { id: 'C-10133', title: 'Burglary complaint', type: 'Burglary', status: 'UNDER_INVESTIGATION', area: 'Ponda', occurredAt: '2026-01-04', priority: 4 },
  ];

  get filtered(): CaseRow[] {
    const q = (this.q.value ?? '').toLowerCase().trim();
    const st = this.status.value ?? 'ALL';

    return this.data
      .filter((r) => {
        const matchQ =
          !q ||
          r.id.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.area.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q);

        const matchS = st === 'ALL' || r.status === st;
        return matchQ && matchS;
      })
      .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
  }

  badgeClass(status: CaseStatus): string {
    if (status === 'OPEN') return 'badge badge--open';
    if (status === 'UNDER_INVESTIGATION') return 'badge badge--invest';
    if (status === 'CLOSED') return 'badge badge--closed';
    return 'badge';
  }

  priorityLabel(p: number): string {
    return 'P' + p;
  }
}
