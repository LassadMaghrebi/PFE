import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeStadesComponent } from './liste-stades.component';

describe('ListeStadesComponent', () => {
  let component: ListeStadesComponent;
  let fixture: ComponentFixture<ListeStadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeStadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeStadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
