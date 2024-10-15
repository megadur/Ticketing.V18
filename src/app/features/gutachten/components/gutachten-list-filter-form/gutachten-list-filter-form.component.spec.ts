import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GutachtenListFilterFormComponent } from './gutachten-list-filter-form.component';

describe('GutachtenListFilterFormComponent', () => {
  let component: GutachtenListFilterFormComponent;
  let fixture: ComponentFixture<GutachtenListFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GutachtenListFilterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GutachtenListFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
