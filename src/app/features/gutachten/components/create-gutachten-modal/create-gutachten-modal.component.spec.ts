import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGutachtenModalComponent } from './create-gutachten-modal.component';

describe('CreateGutachtenModalComponent', () => {
  let component: CreateGutachtenModalComponent;
  let fixture: ComponentFixture<CreateGutachtenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGutachtenModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGutachtenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
