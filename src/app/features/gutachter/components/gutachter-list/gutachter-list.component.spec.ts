import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GutachterListComponent } from './gutachter-list.component';

describe('GutachterListComponent', () => {
  let component: GutachterListComponent;
  let fixture: ComponentFixture<GutachterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GutachterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GutachterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
