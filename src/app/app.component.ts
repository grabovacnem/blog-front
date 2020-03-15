import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {BlogModel} from "./components/blog/blog.model";
import {Subscription} from "rxjs";
import {CommunicationService} from "./core/services/communication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'blog';
  blogPosts: BlogModel;
  blogPostsSubscription: Subscription;
  addBlog = false;
  message: string = '';
  type: string;

  constructor(private appService: AppService, private communicationService: CommunicationService) {
    this.communicationService.actionMessage
      .subscribe((response: any) => {
            this.type = response;
            this.message = response === 'delete' ? 'Blog post deleted.' : response === 'add' ? 'Blog post added.' : 'Blog post updated.';

            setTimeout(() => {
              this.message = ''
            }, 2000)
        }
      );
  }

  ngOnInit(){
    this.getBlogPosts();
  }

  getBlogPosts() {
    this.blogPostsSubscription = this.appService.blogPosts()
      .subscribe(
        (response: any) => {
          this.blogPosts = response.resultData;
        }
      )
  }
}
