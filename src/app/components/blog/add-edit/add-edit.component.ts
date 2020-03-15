import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddBlogModel, BlogModel, EditBlogModel} from "../blog.model";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BlogService} from "../blog.service";
import {CommunicationService} from "../../../core/services/communication.service";

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  @Input() addBlog: boolean;
  @Output() addBlogChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() blogId: number;
  @Input() editBlog: boolean;
  @Output() editBlogChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() reload: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  formSubmitted = false;
  disableButton = false;

  blogForm: FormGroup;

  blogItemModel: AddBlogModel = new AddBlogModel();
  blogItemModelSubscription: Subscription;
  editBlogItemModel: EditBlogModel = new EditBlogModel();
  editBlogItemModelSubscription: Subscription;

  blogModel: BlogModel;
  blogModelSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private blogService: BlogService, private communicationService: CommunicationService) {
    this.blogForm = this.formBuilder.group({
      'title': ['', Validators.required],
      'text': ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.editBlog) {
      this.getBlog();
    }
  }

  closeModal() {
    this.close.emit(true);
  }

  addBlogFunc() {
    this.blogItemModelSubscription = this.blogService.addBlog(this.blogItemModel)
      .subscribe(
        (response: AddBlogModel) => {
          this.addBlogChange.emit(false);
          this.disableButton = false;
          this.communicationService.actionMessage.next('add');
        }, error => {
          this.disableButton = false;
        }
      )
  }

  getBlog() {
    this.editBlogItemModelSubscription = this.blogService.blogPost(this.blogId)
      .subscribe(
        (response: any) => {
          this.blogModel = response.resultData;
          this.blogForm.patchValue({
            'title': this.blogModel.title,
            'text': this.blogModel.text
          });
        }
      )
  }

  editBlogFunc() {
    this.blogItemModelSubscription = this.blogService.editBlog(this.blogId, this.editBlogItemModel)
      .subscribe(
        (response: EditBlogModel) => {
          this.editBlogChange.emit(false);
          this.reload.emit(true);
          this.disableButton = false;
          this.communicationService.actionMessage.next('update');
        }, error => {
          this.disableButton = false;
        }
      )
  }

  submitForm() {
    this.formSubmitted = true;

    if (this.blogForm.valid) {
      this.disableButton = true;

      if (this.addBlog) {
        this.blogItemModel = this.blogForm.value;
        this.addBlogFunc();
      }

      if (this.editBlog) {
        this.editBlogItemModel = this.blogForm.value;
        this.editBlogItemModel.id = this.blogId;
        this.editBlogFunc();
      }
    }
  }
}
