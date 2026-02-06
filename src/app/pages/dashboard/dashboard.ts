import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  stats = {
    total: 128,
    open: 44,
    underInvestigation: 63,
    closed: 21,
  };

  recent = [
    { id: 'C-10231', title: 'Vehicle theft report', status: 'OPEN', area: 'Panaji' },
    { id: 'C-10212', title: 'Assault complaint', status: 'UNDER_INVESTIGATION', area: 'Mapusa' },
    { id: 'C-10198', title: 'Cyber fraud', status: 'CLOSED', area: 'Margao' },
  ];
}
