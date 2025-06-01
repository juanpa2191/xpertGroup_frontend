import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockUser = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  token: 'test-token'
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with validators', () => {
    const form = component.registerForm;
    expect(form.get('username')).toBeTruthy();
    expect(form.get('email')).toBeTruthy();
    expect(form.get('password')).toBeTruthy();
    expect(form.get('firstName')).toBeTruthy();
    expect(form.get('lastName')).toBeTruthy();

    expect(form.get('username')?.hasError('required')).toBeFalse();
    expect(form.get('email')?.hasError('required')).toBeFalse();
    expect(form.get('password')?.hasError('required')).toBeFalse();
    expect(form.get('firstName')?.hasError('required')).toBeFalse();
    expect(form.get('lastName')?.hasError('required')).toBeFalse();
  });

  it('should call register service on submit with valid form', () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    };

    component.registerForm.patchValue(userData);
    authService.register.and.returnValue(of(mockUser));

    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith(userData);
    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should show error message on registration failure', () => {
    const errorMessage = 'Registration failed';
    authService.register.and.returnValue(throwError(() => new Error(errorMessage)));

    component.onSubmit();

    expect(component.errorMessage).toBe(errorMessage);
  });
});
