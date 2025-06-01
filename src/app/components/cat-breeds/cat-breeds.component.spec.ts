import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatBreedsComponent } from './cat-breeds.component';
import { CatService } from '../../../services/cat.service';
import { CatBreed } from '../../../models/cat.model';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockBreeds: CatBreed[] = [
  {
    id: '1',
    name: 'Siamese',
    description: 'Description of Siamese',
    origin: 'Thailand',
    temperament: 'Friendly',
    life_span: '12-15',
    weight: { imperial: '6-12', metric: '3-5' },
    indoor: 1,
    lap: 1,
    adaptability: 5,
    affection_level: 5,
    child_friendly: 3,
    dog_friendly: 3,
    energy_level: 4,
    grooming: 1,
    health_issues: 3,
    intelligence: 5,
    shedding_level: 1,
    social_needs: 5,
    stranger_friendly: 3,
    vocalisation: 5
  }
];

describe('CatBreedsComponent', () => {
  let component: CatBreedsComponent;
  let fixture: ComponentFixture<CatBreedsComponent>;
  let catService: jasmine.SpyObj<CatService>;

  beforeEach(async () => {
    const catServiceSpy = jasmine.createSpyObj('CatService', ['getBreeds', 'getImagesByBreed']);
    catServiceSpy.getBreeds.and.returnValue(of(mockBreeds));

    await TestBed.configureTestingModule({
      declarations: [CatBreedsComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatCardModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: CatService, useValue: catServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatBreedsComponent);
    component = fixture.componentInstance;
    catService = TestBed.inject(CatService) as jasmine.SpyObj<CatService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load breeds on init', () => {
    expect(catService.getBreeds).toHaveBeenCalled();
    expect(component.breeds).toEqual(mockBreeds);
  });

  it('should select breed and load images', () => {
    const breed = mockBreeds[0];
    const mockImages = ['image1.jpg', 'image2.jpg'];
    catService.getImagesByBreed.and.returnValue(of(mockImages));

    component.selectBreed(breed);
    fixture.detectChanges();

    expect(component.selectedBreed).toEqual(breed);
    expect(catService.getImagesByBreed).toHaveBeenCalledWith(breed.id);
    expect(component.images).toEqual(mockImages);
  });
});
