import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import { BlogInfo } from '../models/bloginfo';
import { ServerInfo } from '../models/serverinfo';


@Injectable({
  providedIn: 'root'
})
export class BlogApiService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;
  blogtitle: string;
  blogcontent: string;
  blogauthor: string;
  constructor(private httpClient: HttpClient) {}
  readPosts(): Observable<BlogInfo[]>{
    return this.httpClient.get<BlogInfo[]>(`${this.PHP_API_SERVER}/blog/read.php`);
  }
  fetchPostBySlug(slug: string): Observable<BlogInfo[]>{
    return this.httpClient.get<BlogInfo[]>(`${this.PHP_API_SERVER}/blog/readbyslug.php/?slug=${slug}`);
  }
  fetchPostByID(id: number): Observable<BlogInfo[]>{
    return this.httpClient.get<BlogInfo[]>(`${this.PHP_API_SERVER}/blog/readbyid.php/?id=${id}`);
  }
  fetcUserPosts(author: string): Observable<BlogInfo[]>{
    return this.httpClient.get<BlogInfo[]>(`${this.PHP_API_SERVER}/blog/readuserposts.php/?author=${author}`);
  }
  createPost(blogInfo: BlogInfo): Observable<BlogInfo>{
    return this.httpClient.post<BlogInfo>(`${this.PHP_API_SERVER}/blog/create.php`, blogInfo);
  }
  updatePost(blogInfo: BlogInfo){
    return this.httpClient.put<BlogInfo>(`${this.PHP_API_SERVER}/blog/update.php`, blogInfo);
  }
  deletePost(id: number){
    return this.httpClient.delete<BlogInfo>(`${this.PHP_API_SERVER}/blog/delete.php/?id=${id}`);
  }
}
