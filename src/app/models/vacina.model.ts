export interface Vacina {
  id: string;
  nome: string;
  dose: string; // ex: '1ª dose', '2ª dose', 'Dose única'
  idadeRecomendadaMeses: number; // idade recomendada em meses
  descricao?: string;
}