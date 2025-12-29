import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../../services/search';
import { Card } from "../../components/card/card";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  imports: [Navbar, Card , CommonModule],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {
  type: string = '';
  results: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private content: Service,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.type = params.get('contentType') || '';

          if (!this.type) {
            return [];
          }
          if (this.type === 'bollywood') {
            this.type = 'bolly_movies';
          } else if (this.type === 'hollywood') {
            this.type = 'movies';
          }

          return this.content.gotoCollection(this.type , 20);
        })
      ).subscribe(res => {
        this.results = res;
        this.results = this.results.data;

        console.log(this.results);
        this.cdr.markForCheck();
      });

  }
    goToDetail(item: any): void {
    const type = this.type;
    const id = item._id;

    if (!type || !id) return;  

    this.router.navigate(["content", type, id]);

  }
  @ViewChild('scrollContainer', { static: false })
scrollContainer!: ElementRef<HTMLDivElement>;

scrollLeft() {
  this.scrollContainer.nativeElement.scrollBy({
    left: -700,
    behavior: 'smooth'
  });
}

scrollRight() {
  this.scrollContainer.nativeElement.scrollBy({
    left: 800,
    behavior: 'smooth'
  });
}


}
