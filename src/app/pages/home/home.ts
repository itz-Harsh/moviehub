import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { Card } from '../../components/card/card';
import { Service } from '../../services/search';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navbar, Card],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  loading = false;
  results: any = {
    Recent: [],
    bollyMoviesTrend: [],
    hollyMoviesTrend: [],
    bollySeriesTrend: [],
    hollySeriesTrend: []
  };

  constructor(
    private router: Router,
    private searchService: Service,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.searchService.getTrending('movies', 50).subscribe(res => {
      this.results.hollyMoviesTrend = res;
      this.cdr.markForCheck();
    });

    this.searchService.getTrending('bolly_movies', 50).subscribe(res => {
      this.results.bollyMoviesTrend = res;
      this.cdr.markForCheck();
    });

    this.searchService.getTrending('bolly_series', 50).subscribe(res => {
      this.results.bollySeriesTrend = res;
      this.cdr.markForCheck();
    });

    this.searchService.getTrending('series', 50).subscribe(res => {
      this.results.hollySeriesTrend = res;
      this.cdr.markForCheck();
    });

    this.searchService.getRecent('',100).subscribe(res => {
      this.results.Recent = res;
      this.cdr.markForCheck();
    });

    this.loading = false;
  }

  goToDetail(item: any): void {
    if (!item?.contentType || !item?._id) return;
    this.router.navigate(['content', item.contentType, item._id]);
  }

scrollFromButton(event: MouseEvent, offset: number) {
  const button = event.currentTarget as HTMLElement;

  // find nearest scroll container
  const container = button.parentElement?.querySelector(
    '.overflow-x-auto'
  ) as HTMLElement;

  if (!container) return;

  container.scrollBy({
    left: offset,
    behavior: 'smooth'
  });
}

}
