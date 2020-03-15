import { Injectable } from '@angular/core';
import {environment} from "../environments/environment.localhost";
import {HttpRequestService} from "./core/services/http-request.service";
import {Observable} from "rxjs";
import {BlogModel} from "./components/blog/blog.model";


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private blogPostsUrl = `${environment.apiUrl}/BlogPosts`;

  constructor(private http: HttpRequestService) { }

  blogPosts(): Observable<BlogModel> {
    return this.http.get(this.blogPostsUrl);
  }
}
