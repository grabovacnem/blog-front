import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {BlogModel} from "./components/blog/blog.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'blog';
  blogPosts: BlogModel;
  blogPostsSubscription: Subscription;

  constructor(private appService: AppService) {
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
