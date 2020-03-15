import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddBlogModel} from "../blog.model";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BlogService} from "../blog.service";

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  @Input() addBlog;
  @Output() addBlogChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() reload: EventEmitter<boolean> = new EventEmitter<boolean>();

  formSubmitted = false;
  disableButton = false;

  blogForm: FormGroup;

  blogItemModel: AddBlogModel = new AddBlogModel();
  blogItemModelSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private blogService: BlogService) {
    this.blogForm = this.formBuilder.group({
      'title': ['', Validators.required],
      'text': ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.formSubmitted = true;
    this.disableButton = true;

    if (this.blogForm.valid) {
      this.blogItemModel = this.blogForm.value;
      this.blogItemModelSubscription = this.blogService.addBlog(this.blogItemModel)
        .subscribe(
          (response: AddBlogModel) => {
            this.addBlogChange.emit(false);
            this.disableButton = false;
          }, error => {
            this.disableButton = false;
          }
        )
    }
  }
}
