import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GutachtenListComponent } from './gutachten-list.component';

describe('GutachtenListComponent', () => {
  let component: GutachtenListComponent;
  let fixture: ComponentFixture<GutachtenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GutachtenListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GutachtenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
