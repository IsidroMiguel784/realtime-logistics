import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Package } from '../models/package.model';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  
  private apiUrl = 'http://localhost:3000/packages';

  constructor(private http: HttpClient) {}

  getPackages() {
    return this.http.get<Package[]>(this.apiUrl);
  }
  
}
