import { Routes } from '@angular/router';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { UserComponent } from './components/user/user.component';
import { VirtualmashinesComponent } from './components/virtualmashines/virtualmashines.component';
import { TimesResponsesComponent} from './components/times-responses/times-responses.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent, pathMatch: 'full' }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent, pathMatch: 'full' }]
    },
    {
        path: 'virtual-mashines', component: VirtualmashinesComponent 
    },
    {
        path: 'times-responses', component: TimesResponsesComponent
    },
    {
        path: 'errors', component: ErrorsComponent
    },
    {
        path: 'print', component: PrintLayoutComponent
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];
