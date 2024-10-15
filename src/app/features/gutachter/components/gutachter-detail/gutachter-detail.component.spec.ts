import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GutachterDetailComponent } from './gutachter-detail.component';

describe('GutachterDetailComponent', () => {
  let component: GutachterDetailComponent;
  let fixture: ComponentFixture<GutachterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GutachterDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GutachterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
