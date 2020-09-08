import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';

import { catchError, tap, map } from 'rxjs/operators';
import { Link } from './link';

import {  throwError, BehaviorSubject } from 'rxjs';


@Injectable()
export class LinkService {
    private linksUrl = 'api/links';
    private links:Link[];
    private selectedLinktSource = new BehaviorSubject<Link |null>(null);
    selectedProductChanges$ = this.selectedLinktSource.asObservable();
    
    constructor(private http: HttpClient) { }
    
    createLink(link: Link): Observable<Link> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        link.id = null;
        return this.http.post<Link>(this.linksUrl, link, { headers: headers })
          .pipe(
            tap(data => console.log('createLink: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }

      updateLink(link: Link): Observable<Link> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.linksUrl}/${link.id}`;
        return this.http.put<Link>(url, link, { headers: headers })
          .pipe(
            tap(() => console.log('updateLink: ' + link.id)),
            // Return the Link on an update
            map(() => link),
            catchError(this.handleError)
          );
      }


    changeSelectedLink(link:Link |null):void{
        this.selectedLinktSource.next(link) ;
    }
    
    getLinks(): Observable<Link[]> {
        if(this.links){
            return of(this.links);
        }
        return this.http.get<Link[]>(this.linksUrl)
                        .pipe(
                            tap(data => console.log(JSON.stringify(data))),
                            tap(data=> this.links = data ),
                            catchError(this.handleError)
                        );
    }

    
    getLink(id: number): Observable<Link> {
        if (id === 0) {
            return of(this.initializeProduct());
        }

        if(this.links){
          const foundItem = this.links.find(item=> item.id === id );
          if(foundItem)
             return of(foundItem);
        }

        const url = `${this.linksUrl}/${id}`;
        return this.http.get<Link>(url)
                        .pipe(
                            tap(data => console.log('Data: ' + JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    saveProduct(product: Link): Observable<Link> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (product.id === 0) {
            return this.createProduct(product, headers);
        }
        return this.updateProduct(product, headers);
    }

    deleteLink(id: number): Observable<Link> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        const url = `${this.linksUrl}/${id}`;
        return this.http.delete<Link>(url, { headers: headers} )
                        .pipe(
                            tap(data => console.log('deleteProduct: ' + id)),
                            tap(data => {
                              const findIndex= this.links.findIndex(item => item.id ===id);
                              if(findIndex > -1){
                                this.links.splice(findIndex, 1);
                                this.changeSelectedLink(null);
                              }
                            }),
                            catchError(this.handleError)
                        );
    }

    private createProduct(link:Link , headers: HttpHeaders): Observable<Link> {
        link.id = null;
        return this.http.post<Link>(this.linksUrl, link,  { headers: headers} )
                        .pipe(
                            tap(data => console.log('createLink: ' + JSON.stringify(data))),
                            tap(data=> {
                                this.links.push(data);
                              this.changeSelectedLink(data);
                            }),
                            catchError(this.handleError)
                        );
    }

    private updateProduct(link: Link, headers: HttpHeaders): Observable<Link> {
        const url = `${this.linksUrl}/${link.id}`;
        return this.http.put<Link>(url, link, { headers: headers} )
                        .pipe(
                            tap(data => console.log('updateLink: ' + link.id)),
                            catchError(this.handleError)
                        );
    }

    private initializeProduct(): Link {
        // Return an initialized object
        return {
            'id': 0,
            name: '',
            value: '',
            createdDateTime: '',
            imageUrl: ''
        };
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }

}
