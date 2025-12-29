import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Service } from '../../services/search';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  title = ['Movie','Hub'];
  searchQuery = '';
  results: any[] = [];



  constructor( private router: Router) {}
  ngOnInit(): void {
    // Component initialization
  }



 
  onSubmit(): void {
    if (!this.searchQuery.trim()) return;

    this.router.navigate(['/search'], {
      queryParams: { q: this.searchQuery },
    });
  }
  goToDetail(item: any): void {
    const type = item.contentType;
    const id = item._id;

    if (!type || !id) return;

    this.router.navigate([type, id]);
  }
}
