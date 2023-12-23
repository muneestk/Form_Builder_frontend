// form-details.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css']
})
export class FormDetailsComponent {
  private _subscription: Subscription = new Subscription();
  formId: any;
  singleForm: any;
  formName!: string;
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 4;

  get displayedFields() {
    return this.singleForm.formSubmitted[0]?.formData[0] || [];
  }

  get filteredFormSubmissions() {
    if (!this.searchTerm) {
      return this.singleForm.formSubmitted;
    }

    return this.singleForm.formSubmitted.filter((submission: any) => {
      const values = submission.formData[0] || {};
      const searchableText = Object.values(values).join(' ').toLowerCase();
      return searchableText.includes(this.searchTerm.toLowerCase());
    });
  }

  get totalPages() {
    return Math.ceil(this.filteredFormSubmissions.length / this.itemsPerPage);
  }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedFormSubmissions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredFormSubmissions.slice(startIndex, endIndex);
  }

  constructor(
    private _userService: UserServiceService,
    private _activateRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.formId = this._activateRoute.snapshot.paramMap.get('id');
    if (this.formId) {
      this._subscription.add(
        this._userService.getSingleForm(this.formId).subscribe({
          next: (res) => {
            this.singleForm = res;
            this.formName = res.formName;
          }
        })
      );
    }
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
