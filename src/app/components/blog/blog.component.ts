import {Component, Input, OnInit} from '@angular/core';
import {BlogModel} from "./blog.model";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @Input() blogPost: BlogModel;

  constructor() { }

  ngOnInit(): void {
  }

}
