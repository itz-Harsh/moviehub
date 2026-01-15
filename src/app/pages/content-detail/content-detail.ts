import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Navbar } from '../../components/navbar/navbar';
import { Service } from '../../services/search';
import { ViewCountService } from '../../services/appwrite';

@Component({
  selector: 'app-content-detail',
  standalone: true,
  imports: [Navbar, DatePipe, CommonModule, FormsModule],
  templateUrl: './content-detail.html',
  styleUrl: './content-detail.css',
})
export class ContentDetail {

  type: string | null = null;
  id: string | null = null;

  results: any = null;
  stream: any = null;

  trendSeasons: any = null;
  trendStreams: any = null;

  selectedValue: any = 'Season 1';

  constructor(
    private route: ActivatedRoute,
    private contentService: Service,
    private appwrite: ViewCountService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.type = params.get('type');

      const routePath = this.route.snapshot.routeConfig?.path;

      // =========================
      // 🔥 TRENDING DETAIL PAGE
      // =========================
      if (routePath === 'trending/:id' && this.id) {
        this.loadTrendingDetail(this.id);
        return;
      }

      if (this.type && this.id) {
        this.loadContentDetail(this.type, this.id);
      }
    });
  }

  private async loadTrendingDetail(id: string) {
    try {
      const res = await this.appwrite.loadById(id);
      this.results = res;
      this.stream = JSON.parse(res.seasons) || JSON.parse(res.streams);
      this.type = res.contentType ;

      console.log(this.stream); 
      this.cdr.markForCheck();
    } catch (err) {
      console.error('Trending load error', err);
    }
  }

  private loadContentDetail(type: string, id: string) {

    this.contentService.getDetail(type, id).subscribe(res => {
      this.results = res;
      this.cdr.markForCheck();
    });

    this.contentService.getStream(type, id).subscribe((res: any) => {
      this.stream = res;

      if (type.includes('series')) {
        this.trendSeasons = res?.seasons;
      } else {
        this.trendStreams = res?.streams;
        console.log(this.trendStreams);
      }

      // Track view AFTER everything exists
      this.appwrite.trackView(
        this.results.record_id,
        this.results.featured_image,
        this.results.title,
        this.results.categories,
        type,
        this.trendSeasons,
        this.trendStreams
      );

      this.cdr.markForCheck();
    });
  }

  select() {
    console.log('Selected season:', this.selectedValue);
  }
}
