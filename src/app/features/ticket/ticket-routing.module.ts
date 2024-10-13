import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketEditComponent } from './components/ticket-edit/ticket-edit.component';

const routes: Routes = [
  { path: 'tickets', component: TicketListComponent },
  { path: 'tickets/:id', component: TicketDetailComponent },
  {
    path: 'tickets/:id/edit',
    //canDeactivate: [TicketEditGuard],
    component: TicketEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
