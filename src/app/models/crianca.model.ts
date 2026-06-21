export interface Crianca {
  id: string;
  nome: string;
  dataNascimento: string; // formato ISO: 'AAAA-MM-DD'
  fotoUrl?: string;
  nomeResponsavel?: string;
}