export class BlogModel {
  public id: number;
  public createdAt: string;
  public updatedAt: number;
  public title: string;
  public text: string;
  public categoryId: number;
}

export class AddBlogModel {
  public title: string;
  public text: string;
}

export class EditBlogModel {
  public id: number;
  public title: string;
  public text: string;
}
