import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-case-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './case-form.html',
  styleUrls: ['./case-form.scss'],
})
export class CaseForm {
  id: string | null = null;
  isEdit = false;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.id;

    this.form = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      status: ['OPEN', Validators.required],
      severity: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      area: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  save() {
    this.router.navigateByUrl('/cases');
  }
}
