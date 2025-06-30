import { Routes } from '@angular/router';

// Import components from the components folder

import { Signup } from './components/signup/signup';
import { Signin } from './components/signin/signin';
import { ProjectList } from './components/project-list/project-list';
import { ProjectForm } from './components/project-form/project-form';
import { Home } from './components/home/home';
import { Layout } from './components/layout/layout';

export const routes: Routes = [
    {
    path: 'dashboard',
    component: Layout,
    children: [
      { path: 'projects', component: ProjectList },
      { path: 'project-form', component: ProjectForm }
    ]
  },
  { path: 'home', component: Home },
  { path: 'signup', component: Signup },
  { path: 'signin', component: Signin },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
