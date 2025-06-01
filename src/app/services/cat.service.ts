import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { CatBreed } from '../models/cat.model';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<CatBreed[]> {
    return this.http.get<CatBreed[]>(`${this.apiUrl}/cats/breeds`).pipe(
      catchError((error) => {
        console.error('Error fetching breeds:', error);
        throw new Error('Failed to fetch cat breeds');
      })
    );
  }

  getBreedById(id: string): Observable<CatBreed> {
    return this.http.get<CatBreed>(`${this.apiUrl}/cats/breeds/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching breed with id ${id}:`, error);
        throw new Error(`Failed to fetch breed with id ${id}`);
      })
    );
  }

  getImagesByBreed(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/images/imagesbybreedid/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching images for breed ${id}:`, error);
        throw new Error(`Failed to fetch images for breed ${id}`);
      })
    );
  }

  searchBreeds(query: string): Observable<CatBreed[]> {
    return this.http.get<CatBreed[]>(`${this.apiUrl}/cats/breeds/search?query=${query}`).pipe(
      catchError((error) => {
        console.error(`Error searching breeds for query "${query}":`, error);
        throw new Error(`Failed to search breeds for query "${query}"`);
      })
    );
  }
}
