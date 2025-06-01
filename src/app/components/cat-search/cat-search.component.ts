import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatService } from '../../services/cat.service';
import { CatBreed } from '../../models/cat.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cat-search',
  templateUrl: './cat-search.component.html',
  styleUrls: ['./cat-search.component.scss']
})
export class CatSearchComponent implements OnInit {
  searchForm: FormGroup;
  displayedColumns: string[] = ['name', 'origin', 'temperament', 'life_span'];
  dataSource = new MatTableDataSource<CatBreed>();
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private catService: CatService
  ) {
    this.searchForm = this.fb.group({
      query: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.searchForm.valid) {
      this.loading = true;
      this.catService.searchBreeds(this.searchForm.value.query).subscribe({
        next: (breeds: CatBreed[]) => {
          this.dataSource.data = breeds;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;
        },
        error: (error: Error) => {
          console.error('Search error:', error);
          this.loading = false;
        }
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
