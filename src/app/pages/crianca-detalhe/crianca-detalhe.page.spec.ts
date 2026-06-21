import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriancaDetalhePage } from './crianca-detalhe.page';

describe('CriancaDetalhePage', () => {
  let component: CriancaDetalhePage;
  let fixture: ComponentFixture<CriancaDetalhePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriancaDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
