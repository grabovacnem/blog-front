import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.localhost";
import {HttpRequestService} from "../../core/services/http-request.service";
import {Observable} from "rxjs";
import {BlogModel} from "./blog.model";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private deleteBlogUrl = `${environment.apiUrl}/BlogPosts`;

  constructor(private http: HttpRequestService) { }

  deleteBlog(blogId: number): Observable<void> {
    return this.http.delete(this.deleteBlogUrl + '/' + blogId);
  }
}
