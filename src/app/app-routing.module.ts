import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from '@shared/guards/auth.guard';

const childrenRoutes: VexRoutes = [
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: 'roles',
    loadChildren: () => import('./pages/rol/rol.module').then(m => m.RolModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

const routes: VexRoutes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: '',
    component: CustomLayoutComponent,
    children: childrenRoutes,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}