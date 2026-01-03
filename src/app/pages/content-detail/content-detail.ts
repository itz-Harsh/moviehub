import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { ActivatedRoute } from '@angular/router';
import { Service } from '../../services/search';
import { switchMap } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content-detail',
  imports: [Navbar, DatePipe, CommonModule, FormsModule],
  templateUrl: './content-detail.html',
  styleUrl: './content-detail.css',
})
export class ContentDetail {
  type = '';
  id = ''
  results: any = null; 
  stream: any = null;

  selectedValue: any | null = 'Season 1';



  constructor(
    private route: ActivatedRoute,
    private contentDetail: Service,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.type = params.get('type') || '';
          this.id = params.get('id') || '';

          if (!this.type || !this.id) {
            return []; 
          }

          return this.contentDetail.getDetail(this.type, this.id);
        })
      ).subscribe(res => {
        this.results = res;
        // console.log(this.results); 
        this.cdr.markForCheck();
      });

    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.type = params.get('type') || '';
          this.id = params.get('id') || '';

          if (!this.type || !this.id) {
            return [];
          }

          return this.contentDetail.getStream(this.type, this.id);
        })
      ).subscribe(res => {
        this.stream = res;
        // console.log(this.stream)
        // this.selectedValue = this.stream.seasons[0]
        this.cdr.markForCheck();
      });
  }
  select() {
    console.log(this.selectedValue);

  }


}
