import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { LinkResolved } from './link';
import { LinkService } from './link.service';

@Injectable({
  providedIn: 'root'
})
export class LinkResolver implements Resolve<LinkResolved> {

  constructor(private linkService: LinkService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<LinkResolved> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Link id was not a number: ${id}`;
      console.error(message);
      return of({ link: null, error: message });
    }

    return this.linkService.getLink(+id)
      .pipe(
        map(link => ({ link: link })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ link: null, error: message });
        })
      );
  }

}
