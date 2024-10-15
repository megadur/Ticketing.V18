import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GutachtenEditComponent } from './gutachten-edit.component';

describe('GutachtenEditComponent', () => {
  let component: GutachtenEditComponent;
  let fixture: ComponentFixture<GutachtenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GutachtenEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GutachtenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
