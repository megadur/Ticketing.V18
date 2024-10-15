import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GutachtenListGridComponent } from './gutachten-list-grid.component';

describe('GutachtenListGridComponent', () => {
  let component: GutachtenListGridComponent;
  let fixture: ComponentFixture<GutachtenListGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GutachtenListGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GutachtenListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
