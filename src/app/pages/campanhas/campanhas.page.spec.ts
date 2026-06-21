import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampanhasPage } from './campanhas.page';

describe('CampanhasPage', () => {
  let component: CampanhasPage;
  let fixture: ComponentFixture<CampanhasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CampanhasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
