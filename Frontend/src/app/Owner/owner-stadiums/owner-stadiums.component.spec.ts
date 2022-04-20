import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerStadiumsComponent } from './owner-stadiums.component';

describe('OwnerStadiumsComponent', () => {
  let component: OwnerStadiumsComponent;
  let fixture: ComponentFixture<OwnerStadiumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerStadiumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerStadiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
