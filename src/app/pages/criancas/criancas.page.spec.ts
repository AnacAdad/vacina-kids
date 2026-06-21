import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriancasPage } from './criancas.page';

describe('CriancasPage', () => {
  let component: CriancasPage;
  let fixture: ComponentFixture<CriancasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriancasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
