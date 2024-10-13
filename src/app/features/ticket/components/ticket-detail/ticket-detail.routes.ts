import { Route } from '@angular/router'
import { TicketService } from '../../data/services'
import { TicketDetailComponent } from './ticket-detail.component'

export const routes: Route[] = [
  {
    path: '',
    component: TicketDetailComponent,
    providers: [
      TicketService,
//      provideEffects(editArticleEffects),
  //    provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
]
