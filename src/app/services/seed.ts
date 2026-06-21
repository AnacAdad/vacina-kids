import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { DadosService } from './dados';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor(
    private firestore: Firestore,
    private dadosService: DadosService
  ) { }

  async popularDados(): Promise<void> {
    await this.popularColecao('criancas', this.dadosService.obterCriancas());
    await this.popularColecao('vacinas', this.dadosService.obterVacinas());
    await this.popularColecao('registrosVacina', this.dadosService.obterRegistros());
    await this.popularColecao('campanhas', this.dadosService.obterCampanhas());

    console.log('Dados populados com sucesso no Firestore!');
  }

  private async popularColecao(nomeColecao: string, itens: any[]): Promise<void> {
    const colecaoRef = collection(this.firestore, nomeColecao);

    for (const item of itens) {
      const docRef = doc(colecaoRef, item.id);
      await setDoc(docRef, item);
    }
  }
}
