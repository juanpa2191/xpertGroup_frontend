import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { CatBreed } from '../../models/cat.model';

@Component({
  selector: 'app-cat-breeds',
  templateUrl: './cat-breeds.component.html',
  styleUrls: ['./cat-breeds.component.scss']
})
export class CatBreedsComponent implements OnInit {
  breeds: CatBreed[] = [];
  selectedBreed: CatBreed | null = null;
  images: any;

  constructor(private catService: CatService) {}

  ngOnInit() {
    this.loadBreeds();
  }

  loadBreeds() {
    this.catService.getBreeds().subscribe({
      next: (breeds: CatBreed[]) => this.breeds = breeds,
      error: (error: Error) => console.error('Error loading breeds:', error)
    });
  }

  selectBreed(breed: CatBreed) {
    this.selectedBreed = breed;
    this.catService.getImagesByBreed(breed.id).subscribe({
      next: (images: any) => this.images = images,
      error: (error: Error) => console.error('Error loading images:', error)
    });
  }
}
