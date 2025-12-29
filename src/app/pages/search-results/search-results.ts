import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../services/search';
import { switchMap } from 'rxjs';
import { Navbar } from '../../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Card } from "../../components/card/card";
import { log } from 'node:console';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [Navbar, CommonModule, Card],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults {
  query = '';
  results: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: Service,
    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap(params => {
          this.query = params['q'] || '';
          return this.searchService.search(this.query);
        })
      )
      .subscribe(res => {
        this.results = res;
        // console.log(this.results);
        this.cdr.markForCheck();

      });
  }

  goToDetail(item: any): void {
    const type = item.contentType;
    const id = item._id;

    if (!type || !id) return;

    this.router.navigate(["content", type, id]);
  }
}
