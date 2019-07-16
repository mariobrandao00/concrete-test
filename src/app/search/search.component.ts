import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SlugifyPipe } from '../pipes/slugify.pipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('nameField', {static: true}) nameField: ElementRef;

  public searchForm: FormGroup;

  constructor(public router: Router, private slugifyPipe: SlugifyPipe) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.searchForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  submitForm() {
    if (this.searchForm.status === 'INVALID') {
      this.nameField.nativeElement.focus();
    } else {
      const slug = this.slugifyPipe.transform(this.nameField.nativeElement.value);
      this.router.navigateByUrl('/user/' + slug);
    }
  }

}
