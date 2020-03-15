import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlogModel} from "./blog.model";
import {BlogService} from "./blog.service";
import {CommunicationService} from "../../core/services/communication.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @Input() blogPost: BlogModel;
  @Output() emit: EventEmitter<boolean> = new EventEmitter<boolean>();

  editBlog = false;

  constructor(private blogService: BlogService, private communicationService: CommunicationService) { }

  ngOnInit(): void {
  }

  emitTrue() {
    this.emit.emit(true);
  }

  deletePost(id) {
    this.blogService.deleteBlog(id)
      .subscribe(
        (response: any) => {
          this.emitTrue();
          this.communicationService.actionMessage.next('delete');
        }
      )
  }

}
