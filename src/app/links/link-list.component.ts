import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Link } from './link';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from './link.service';

@Component({
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit, AfterViewInit {

  pageTitle:string = "Link list";
  imageWidth = 50;
  imageMargin = 2;
  errorMessage = '';

  @ViewChild('listFilterElement') listFilterElementRef:ElementRef;
  
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredLinks = this.listFilter ? this.performFilter(this.listFilter) : this.links;
  }

  filteredLinks: Link[] = [];
  links: Link[] = [];

  constructor(private linkService: LinkService,
    private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    if(this.listFilterElementRef){
      this.listFilterElementRef.nativeElement.focus();
    }
  }

ngOnInit(): void {
this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
console.log(this.listFilter)

this.linkService.getLinks().subscribe(
links => {
console.log(this.listFilter)
this.links = links;
this.filteredLinks = this.performFilter(this.listFilter);
},
error => this.errorMessage = <any>error
);

}

performFilter(filterBy: string): Link[] {
filterBy = filterBy.toLocaleLowerCase();
return this.links.filter((link: Link) =>
link.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
}



}
