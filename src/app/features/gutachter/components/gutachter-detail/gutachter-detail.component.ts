import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Gutachter } from '../../data/types/gutachter';
import { StarComponent } from '../../../../shared/star/star.component';
import { GutachterService } from '../../data/services/gutachter.service';

@Component({
  selector: 'app-gutachter-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    StarComponent,
  ],
  templateUrl: './gutachter-detail.component.html',
  styleUrl: './gutachter-detail.component.css'
})
export class GutachterDetailComponent implements OnInit {
  pageTitle = 'Gutachter Detail';
  errorMessage = '';
  gutachter: Gutachter | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gutachterService: GutachterService
  ) {
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getGutachter(id);
    }
  }

  getGutachter(id: number): void {
    this.gutachterService.gutachter(id).subscribe({
      next: (gutachter: Gutachter | undefined) => this.gutachter = gutachter,
      error: (err: string) => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/gutachters']);
  }

}
