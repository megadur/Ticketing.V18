import { Route } from '@angular/router'
import { GutachtenService } from '../../data/services'
import { GutachtenDetailComponent } from '../gutachten-detail/gutachten-detail.component'



export const routes: Route[] = [
  {
    path: '',
    component: GutachtenDetailComponent,
    providers: [
      GutachtenService,
//      provideEffects(editArticleEffects),
  //    provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
]
