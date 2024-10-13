import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListFilterFormComponent } from './ticket-list-filter-form.component';

describe('TicketListFilterFormComponent', () => {
  let component: TicketListFilterFormComponent;
  let fixture: ComponentFixture<TicketListFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketListFilterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketListFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
