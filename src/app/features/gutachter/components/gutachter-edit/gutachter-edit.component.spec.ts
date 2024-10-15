import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GutachterEditComponent } from './gutachter-edit.component';

describe('GutachterEditComponent', () => {
  let component: GutachterEditComponent;
  let fixture: ComponentFixture<GutachterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GutachterEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GutachterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
