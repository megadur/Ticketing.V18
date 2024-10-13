import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFilterFormComponent } from './ticket-filter-form.component';

describe('TicketFilterFormComponent', () => {
  let component: TicketFilterFormComponent;
  let fixture: ComponentFixture<TicketFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketFilterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
