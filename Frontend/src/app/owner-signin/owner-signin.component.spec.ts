import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSigninComponent } from './owner-signin.component';

describe('OwnerSigninComponent', () => {
  let component: OwnerSigninComponent;
  let fixture: ComponentFixture<OwnerSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
