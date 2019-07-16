import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailsComponent implements OnInit {

  public user;
  public loading = true;
  public notFound = false;

  constructor(public route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getUser(params['slug']);
    });
  }

  getUser(slug) {
    this.userService.getAllDataBySlug(slug).subscribe((userData) => {

      this.user = userData[0];
      this.user.followers = userData[1];
      this.user.repositories = userData[2];
      this.user.followers_count = this.user.followers ? this.user.followers.length : 0;
      this.user.stargazers_count = 0;

      this.user.repositories.forEach((repository) => {
        this.user.stargazers_count += repository.stargazers_count;
      });

      this.loading = false;
      this.notFound = false;


      console.log(this.user);

    }, (error) => {
      this.loading = false;
      this.notFound = true;
      console.log(error);
    });
  }

}
