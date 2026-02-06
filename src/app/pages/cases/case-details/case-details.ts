import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-case-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './case-details.html',
  styleUrls: ['./case-details.scss'],
})
export class CaseDetails {
  id = '';

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
