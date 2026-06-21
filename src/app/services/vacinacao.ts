import { Injectable } from '@angular/core';
import { RegistroVacina, StatusVacina } from '../models/registro-vacina.model';

@Injectable({
  providedIn: 'root'
})
export class VacinacaoService {

  constructor() { }

  /**
   * Calcula o status de um registro de vacina com base na data prevista
   * e na data de aplicação (se existir).
   */
  calcularStatus(registro: RegistroVacina): StatusVacina {
    if (registro.dataAplicada) {
      return 'aplicada';
    }

    const hoje = new Date();
    const dataPrevista = new Date(registro.dataPrevista);

    if (dataPrevista < hoje) {
      return 'atrasada';
    }

    return 'pendente';
  }

  /**
   * Retorna todos os registros de um conjunto, já enriquecidos com o status calculado.
   */
  enriquecerComStatus(registros: RegistroVacina[]): Array<RegistroVacina & { status: StatusVacina }> {
    return registros.map(registro => ({
      ...registro,
      status: this.calcularStatus(registro)
    }));
  }

  /**
   * Filtra apenas os registros de uma criança específica.
   */
  filtrarPorCrianca(registros: RegistroVacina[], criancaId: string): RegistroVacina[] {
    return registros.filter(r => r.criancaId === criancaId);
  }
}
