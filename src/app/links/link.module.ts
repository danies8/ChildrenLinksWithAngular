import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LinkService } from './link.service';
import { LinkListComponent } from './link-list.component';
import { LinkEditComponent } from './link-edit/link-edit.component';
import { LinkEditGuard } from './link-edit/link-edit-guard.service';
import { LinkResolver } from './link-resolver.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
     { path: 'links', component: LinkListComponent },
     { path: 'links/:id/edit',  canDeactivate: [ LinkEditGuard ],
     resolve: { resolvedData: LinkResolver },component: LinkEditComponent },
     { path: 'links/0/edit', component: LinkEditComponent },
    ])
  ],
  declarations: [
    LinkListComponent,
    LinkEditComponent,
   ],
  providers: [
    LinkService,
    LinkEditGuard
  ]
})
export class LinkModule { }
