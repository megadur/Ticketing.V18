import { Route } from '@angular/router'
import { GutachterService } from '../../data/services/gutachter.service'
import { GutachterDetailComponent } from './gutachter-detail.component'


export const routes: Route[] = [
  {
    path: '',
    component: GutachterDetailComponent,
    providers: [
      GutachterService,
//      provideEffects(editArticleEffects),
  //    provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
]
