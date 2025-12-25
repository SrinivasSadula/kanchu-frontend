import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  features = [
    {
      title: 'Premium Quality',
      description: 'Handcrafted products made with finest materials',
      icon: '✨'
    },
    {
      title: 'Authentic Artisan',
      description: 'Direct from skilled craftspeople',
      icon: '🎨'
    },
    {
      title: 'Fast Delivery',
      description: 'Quick and secure shipping nationwide',
      icon: '🚚'
    }
  ];
}
