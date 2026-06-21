export type StatusVacina = 'aplicada' | 'pendente' | 'atrasada';

export interface RegistroVacina {
  id: string;
  criancaId: string;
  vacinaId: string;
  dataPrevista: string; // formato ISO
  dataAplicada?: string; // se já foi aplicada
}