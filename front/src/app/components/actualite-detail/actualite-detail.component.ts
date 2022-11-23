import { Actualite } from '../../model/actualite';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActualiteService } from '../../services/actualite.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-actualite-detail',
  templateUrl: './actualite-detail.component.html',
  styleUrls: ['./actualite-detail.component.css'],
})
export class ActualiteDetailComponent implements OnInit {
  cheminLogo = '../../../assets/images/logo-lght.png';
  navbarfixed: boolean = false;
  actualiteId: any;
  actualite: Actualite;
  deletedId: Number;
  closeResult: string;
  updatedId: Number;
  comments: any[] = [];
  commentText: string;
  show: any;
  editText: string;
  username = JSON.parse(localStorage.getItem('user')).username;

  constructor(
    private route: ActivatedRoute,
    private actServ: ActualiteService
  ) {}

  ngOnInit() {
    // 'bank' is the name of the route parameter
    this.actualiteId = this.route.snapshot.params['id'];
    console.log(this.actualiteId);
    this.actServ.readAll().subscribe(
      (acts) => {
        this.actualite = acts.filter((a) => a._id === this.actualiteId)[0];
        this.actualite.comments.forEach((commentId) => {
          this.actServ.getComment(commentId).subscribe((comment) => {
            this.comments.push(comment);
            this.comments = this.comments.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
          });
        });
        console.log(this.comments);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveComment() {
    this.actServ
      .saveComment(this.actualiteId, this.commentText, this.username)
      .subscribe((res) => this.comments.push(res.comment));
  }

  editComment(comment: any, index: any) {
    this.actServ.updateComment(comment._id, this.editText).subscribe((res) => {
      if (res.modifiedCount == 1) {
        this.comments[index].text = this.editText;
        this.show = undefined;
      }
    });
  }

  deleteComment(comment: any, index: any) {
    this.actServ
      .deleteComment(comment._id)
      .subscribe((res) => console.log(res));
    //this.comments[index] = this.comments.shift();
    //delete this.comments[index];
    this.comments.splice(index, 1);
  }
}
