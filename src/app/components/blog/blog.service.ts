import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.localhost";
import {HttpRequestService} from "../../core/services/http-request.service";
import {Observable} from "rxjs";
import {AddBlogModel, BlogModel} from "./blog.model";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogUrl = `${environment.apiUrl}/BlogPosts`;

  constructor(private http: HttpRequestService) { }

  deleteBlog(blogId: number): Observable<void> {
    return this.http.delete(this.blogUrl + '/' + blogId);
  }

  addBlog(blog: AddBlogModel): Observable<AddBlogModel> {
    return this.http.post(this.blogUrl, blog);
  }
}
