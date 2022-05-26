import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutStadeComponent } from './ajout-stade.component';

describe('AjoutStadeComponent', () => {
  let component: AjoutStadeComponent;
  let fixture: ComponentFixture<AjoutStadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutStadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutStadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
