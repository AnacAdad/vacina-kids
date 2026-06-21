import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc,updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Crianca } from '../models/crianca.model';
import { Vacina } from '../models/vacina.model';
import { RegistroVacina } from '../models/registro-vacina.model';
import { Campanha } from '../models/campanha.model';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  constructor(private firestore: Firestore) { }

  obterCriancas(): Observable<Crianca[]> {
    const ref = collection(this.firestore, 'criancas');
    return collectionData(ref, { idField: 'id' }) as Observable<Crianca[]>;
  }

  obterCriancaPorId(id: string): Observable<Crianca> {
    const ref = doc(this.firestore, 'criancas', id);
    return docData(ref, { idField: 'id' }) as Observable<Crianca>;
  }

  obterVacinas(): Observable<Vacina[]> {
    const ref = collection(this.firestore, 'vacinas');
    return collectionData(ref, { idField: 'id' }) as Observable<Vacina[]>;
  }

  obterRegistros(): Observable<RegistroVacina[]> {
    const ref = collection(this.firestore, 'registrosVacina');
    return collectionData(ref, { idField: 'id' }) as Observable<RegistroVacina[]>;
  }

  obterCampanhas(): Observable<Campanha[]> {
    const ref = collection(this.firestore, 'campanhas');
    return collectionData(ref, { idField: 'id' }) as Observable<Campanha[]>;
  }

  async adicionarCrianca(crianca: Omit<Crianca, 'id'>): Promise<void> {
  const ref = collection(this.firestore, 'criancas');
  await addDoc(ref, crianca);
}

async adicionarCampanha(campanha: Omit<Campanha, 'id'>): Promise<void> {
  const ref = collection(this.firestore, 'campanhas');
  await addDoc(ref, campanha);
}

async marcarVacinaAplicada(registroId: string, dataAplicada: string): Promise<void> {
  const ref = doc(this.firestore, 'registrosVacina', registroId);
  await updateDoc(ref, { dataAplicada });
}
}
