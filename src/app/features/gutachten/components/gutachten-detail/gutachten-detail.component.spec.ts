import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GutachtenDetailComponent } from './gutachten-detail.component';

describe('GutachtenDetailComponent', () => {
  let component: GutachtenDetailComponent;
  let fixture: ComponentFixture<GutachtenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GutachtenDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GutachtenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
