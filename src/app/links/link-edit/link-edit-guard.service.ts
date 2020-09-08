import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { LinkEditComponent } from './link-edit.component';


@Injectable()
export class LinkEditGuard implements CanDeactivate<LinkEditComponent> {

    canDeactivate(component: LinkEditComponent): boolean {
        if (component.isDirty) {
            const linkName = component.link.name || 'New Link';
            return confirm(`Navigate away and lose all changes to ${linkName}?`);
        }
        return true;
    }
}
