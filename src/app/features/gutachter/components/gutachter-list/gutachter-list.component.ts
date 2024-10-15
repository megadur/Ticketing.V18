import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { GutachterService } from '../../data/services/gutachter.service';
import { Gutachter } from '../../data/types/gutachter';
import { StarComponent } from '../../../../shared/star/star.component';

@Component({
  selector: 'app-gutachter-list',
  standalone: true,
  imports: [    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterLink,
    StarComponent,
  ],
  templateUrl: './gutachter-list.component.html',
  styleUrl: './gutachter-list.component.css'
})
export class GutachterListComponent implements OnInit {
  pageTitle = 'Gutachter List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredGutachters = this.listFilter ? this.performFilter(this.listFilter) : this.gutachters;
  }

  filteredGutachters: Gutachter[] = [];
  gutachters: Gutachter[] = [];

  constructor(private gutachterService: GutachterService) { }

  performFilter(filterBy: string): Gutachter[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.gutachters.filter((gutachter: Gutachter) =>
      gutachter.name?.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  // Checks both the gutachter name and tags
  performFilter2(filterBy: string): Gutachter[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.gutachters.filter((gutachter: Gutachter) =>
      gutachter.name?.toLocaleLowerCase().indexOf(filterBy) !== -1 
  //  ||      (gutachter.tags && gutachter.tags.some(tag => tag.toLocaleLowerCase().indexOf(filterBy) !== -1))
  );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.gutachterService.gutachters().subscribe({
      next: gutachters => {
        this.gutachters = gutachters;
        this.filteredGutachters = this.gutachters;
      },
      error: err => this.errorMessage = err
    });
  }
}
