import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Link, LinkResolved } from '../link';
import { LinkService } from '../link.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-link-edit',
  templateUrl: './link-edit.component.html',
  styleUrls: ['./link-edit.component.css']
})
export class LinkEditComponent implements OnInit {
  @ViewChild(NgForm) editForm: NgForm;
  pageTitle: string = 'Link Edit';
  errorMessage: string;
  private originalLink: Link;
  link: Link;
  urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

   get isDirty(): boolean {
    return this.editForm.dirty ? true : false;
}

constructor(private linkService: LinkService,
            private router: Router,
            private route: ActivatedRoute) {
}

ngOnInit(): void {
    this.route.data.subscribe(data => {
        const resolvedData: LinkResolved = data['resolvedData'];
        this.errorMessage = resolvedData.error;
        this.onLinkRetrieved(resolvedData.link);
      });
}

onLinkRetrieved(link: Link): void {
    // Reset back to pristine
    this.editForm.reset();

    // Display the data in the form
    // Use a copy to allow cancel.
    this.originalLink = link;
    console.log("before"+link);
    this.link = Object.assign({}, link);
     if (this.link.id === 0) {
        this.pageTitle = 'Add Link';
    } else {
        this.pageTitle = `Edit Link: ${this.link.name}`;
    }
}

cancel(): void {
    // Navigate back to the product list
    this.router.navigate(['/links'], {queryParamsHandling : 'preserve'});
}

deleteLink(): void {
    if (this.link.id) {
        if (confirm(`Really delete the link: ${this.link.name}?`)) {
            this.linkService.deleteLink(this.link.id)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        }
    } else {
        // Don't delete, it was never saved.
        this.onSaveComplete();
    }
}

saveLink(): void {
 
    if (this.editForm.valid) {
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      var today  = new Date();
      this.link.createdDateTime = new Date().toLocaleDateString("en-US", options);
      this.linkService.saveProduct(this.link)
            .subscribe(() => {
                // Assign the changes from the copy
                Object.keys(this.link).forEach(key =>
                    this.originalLink[key] = this.link[key]
                );
                this.onSaveComplete();
            },
            (error: any) => this.errorMessage = <any>error
            );
    } else {
        this.errorMessage = 'Please correct the validation errors.';
    }
}

onSaveComplete(): void {
    // Reset back to pristine
    this.editForm.reset(this.editForm.value);
    // Navigate back to the link list
    this.router.navigate(['/links']);
}

}
