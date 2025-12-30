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

  type = '';

  allResults: any = [];   // full data from API
  results: any[] = [];      // visible data (paged)

  page = 1;
  limit = 30;
  loading = false;
  hasMore = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private content: Service,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      this.type = params.get('contentType') || '';

      if (this.type === 'bollywood movies') this.type = 'bolly_movies';
      if (this.type === 'hollywood movies') this.type = 'movies';
      if (this.type === 'bollywood series') this.type = 'bolly_series';
      if (this.type === 'hollywood series') this.type = 'series';

      if (!this.type) return;

      // reset state
      this.page = 1;
      this.results = [];
      this.allResults = [];
      this.hasMore = true;

      this.fetchAll();
    });
  }

  fetchAll(): void {
    this.loading = true;

    // fetch ONCE
    this.content.getTrending(this.type, 8000).subscribe(res => {
      this.allResults = res || [];
      this.loading = false;
      this.appendPage();
    });
  }

  appendPage(): void {
    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;

    const chunk = this.allResults.slice(start, end);

    if (chunk.length === 0) {
      this.hasMore = false;
      return;
    }

    this.results = [...this.results, ...chunk];
    this.page++;

    this.cdr.markForCheck();
  }

  loadMore(): void {
    if (this.loading || !this.hasMore) return;
    this.appendPage();
  }

  goToDetail(item: any): void {
    if (!item?._id) return;
    this.router.navigate(['content', this.type, item._id]);
  }


}

