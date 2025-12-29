import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Service } from '../../services/search';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Card } from "../../components/card/card";


@Component({
  selector: 'app-home',
  imports: [Navbar, CommonModule, Card],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  results: any = { 
    hollySeriesTrend: [] = [],           //Added
    bollySeriesTrend: [] = [],
    Recent: [] = [],                    // Added
    hollyMoviesTrend: [] = [],
    bollyMoviesTrend: [] = []
  };

 constructor(
    private router: Router,
    private searchService: Service,
    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
  
  this.searchService.getTrending('movies' , 20).subscribe(res => {
    this.results.hollyMoviesTrend = res;
    this.cdr.markForCheck(); // needed for zoneless
  });


  this.searchService.getTrending('bolly_movies' , 20).subscribe(res => {
    this.results.bollyMoviesTrend = res;
    this.cdr.markForCheck(); // needed for zoneless
  });

  this.searchService.getTrending('bolly_series' , 20).subscribe(res => {
    this.results.bollySeriesTrend = res;
    this.cdr.markForCheck(); // needed for zoneless
  });


  this.searchService.getTrending('series' , 20).subscribe(res => {
    this.results.hollySeriesTrend = res;
    this.cdr.markForCheck(); // needed for zoneless
  });

  this.searchService.getRecent('').subscribe(res => {
    this.results.Recent = res;
    this.cdr.markForCheck(); // needed for zoneless
  })
  
}

  
  
  goToDetail(item: any): void {
    const type = item.contentType;
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
