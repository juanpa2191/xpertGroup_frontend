import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatSearchComponent } from './cat-search.component';
import { CatService } from '../../../services/cat.service';
import { CatBreed } from '../../../models/cat.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
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

describe('CatSearchComponent', () => {
  let component: CatSearchComponent;
  let fixture: ComponentFixture<CatSearchComponent>;
  let catService: jasmine.SpyObj<CatService>;

  beforeEach(async () => {
    const catServiceSpy = jasmine.createSpyObj('CatService', ['searchBreeds']);
    catServiceSpy.searchBreeds.and.returnValue(of(mockBreeds));

    await TestBed.configureTestingModule({
      declarations: [CatSearchComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: CatService, useValue: catServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSearchComponent);
    component = fixture.componentInstance;
    catService = TestBed.inject(CatService) as jasmine.SpyObj<CatService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with validators', () => {
    const form = component.searchForm;
    expect(form.get('query')).toBeTruthy();
    expect(form.get('query')?.hasError('required')).toBeFalse();
  });

  it('should search breeds on submit', () => {
    const query = 'siamese';
    component.searchForm.patchValue({ query });

    component.onSubmit();

    expect(catService.searchBreeds).toHaveBeenCalledWith(query);
    expect(component.loading).toBeFalse();
    expect(component.breeds).toEqual(mockBreeds);
  });

  it('should show loading state during search', () => {
    const query = 'siamese';
    component.searchForm.patchValue({ query });
    catService.searchBreeds.and.returnValue(of(mockBreeds).pipe(delay(1000)));

    component.onSubmit();

    expect(component.loading).toBeTrue();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.loading).toBeFalse();
    });
  });

  it('should handle search errors', () => {
    const errorMessage = 'Search failed';
    component.searchForm.patchValue({ query: 'test' });
    catService.searchBreeds.and.returnValue(throwError(() => new Error(errorMessage)));

    component.onSubmit();

    expect(component.loading).toBeFalse();
  });
});
