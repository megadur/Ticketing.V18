import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignGutachterModalComponent } from './assign-gutachter-modal.component';

describe('AssignGutachterModalComponent', () => {
  let component: AssignGutachterModalComponent;
  let fixture: ComponentFixture<AssignGutachterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignGutachterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignGutachterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
