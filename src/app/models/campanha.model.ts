export interface Campanha {
  id: string;
  titulo: string;
  descricao: string;
  publicoAlvo: string; // ex: '0 a 2 anos'
  dataInicio: string;
  dataFim: string;
}