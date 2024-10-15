import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GutachtenWithGutachter } from '../../data/types/gutachten-with-gutachter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gutachten-list-grid',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './gutachten-list-grid.component.html',
  styleUrl: './gutachten-list-grid.component.css'
})
export class GutachtenListGridComponent implements OnInit {
  @Input() gutachtensWithGutachters: GutachtenWithGutachter[]|null = [];
  @Input() isLoading: boolean|null = false;

  @Output() view = new EventEmitter<number>();
  @Output() assign = new EventEmitter<number>();
  @Output() complete = new EventEmitter<{gutachtenId: number, originalStatus: boolean}>();

  constructor() {}

  ngOnInit() {}
}
