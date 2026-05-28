import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageService } from './services/package';
import { SocketService } from './services/socket';
import { Package } from './models/package.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit {
  packages: Package[] = [];

  constructor(
    private packageService: PackageService,
    private socketService: SocketService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.packageService.getPackages().subscribe({
      next: (data: Package[]) => {
        console.log(data);

        this.packages = data;
      },

      error: (error) => {
        console.error(error);
      },
    });

    this.socketService.listen('packageCreated')
    .subscribe((data: any) => {

      console.log('Realtime package:', data);

      this.ngZone.run(() => {
        
        this.packages = [...this.packages, data];

        this.cdr.detectChanges();

      });

    });

  }
}
