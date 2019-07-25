import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Article } from '../article';
import { User } from '../user';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id: string;
  artilces: Article[] = [];
  users: User[] = [];
  searchableList = [];
  errorMsg = '';
  constructor(private router: Router,public authService: AuthService, private _articleService: ArticleService) { }

  

  ngOnInit() {
    this.id = localStorage.getItem('token');
    this.searchableList = ['author','title']
    this.users = [
      {username: 'user1@gmail.com'},
      {username: 'user2@gmail.com'},
      {username: 'user3@gmail.com'},
      {username: 'user4@gmail.com'}
    ]
    // this._articleService.getArticles().subscribe(data => this.artilces= data);
    this._articleService.getArticles().subscribe(
      (data) => this.artilces= data, // success path
      error => this.errorMsg = error.message // error path
    );
  }

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
