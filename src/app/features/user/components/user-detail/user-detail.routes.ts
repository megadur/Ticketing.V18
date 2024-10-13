import { Route } from '@angular/router'
import { UserService } from '../../data/services/user.service'
import { UserDetailComponent } from './user-detail.component'


export const routes: Route[] = [
  {
    path: '',
    component: UserDetailComponent,
    providers: [
      UserService,
//      provideEffects(editArticleEffects),
  //    provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
]
