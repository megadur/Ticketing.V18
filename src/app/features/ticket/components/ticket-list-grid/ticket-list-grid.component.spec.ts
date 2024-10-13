import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListGridComponent } from './ticket-list-grid.component';

describe('TicketListGridComponent', () => {
  let component: TicketListGridComponent;
  let fixture: ComponentFixture<TicketListGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketListGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
