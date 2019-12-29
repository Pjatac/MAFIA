import { Routes } from '@angular/router';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { UserComponent } from './components/user/user.component';
import { VirtualmashinesComponent } from './components/virtualmashines/virtualmashines.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'virtual-mashines', component: VirtualmashinesComponent
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];
