import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlogModel} from "./blog.model";
import {BlogService} from "./blog.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @Input() blogPost: BlogModel;
  @Output() deleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
  }

  emitTrue() {
    this.deleted.emit(true);
  }

  deletePost(id) {
    this.blogService.deleteBlog(id)
      .subscribe(
        (response: any) => {
          this.emitTrue();
        }
      )
  }

}
