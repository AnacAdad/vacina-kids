import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular/standalone';
import {ModalCriancaComponent} from '../../components/modal-crianca/modal-crianca.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonBadge,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, personCircleOutline, addOutline } from 'ionicons/icons';
import { combineLatest, map, switchMap } from 'rxjs';
import { DadosService } from '../../services/dados';
import { VacinacaoService } from '../../services/vacinacao';
import { Crianca } from '../../models/crianca.model';

interface CriancaComResumo extends Crianca {
  idadeFormatada: string;
  totalVacinas: number;
  totalAplicadas: number;
  totalAtrasadas: number;
}

@Component({
  selector: 'app-criancas',
  templateUrl: './criancas.page.html',
  styleUrls: ['./criancas.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonMenuButton, IonList, IonItem,
    IonAvatar, IonLabel, IonBadge, IonIcon,
    CommonModule, FormsModule, IonFab, IonFabButton
  ]
})
export class CriancasPage implements OnInit {

  criancas: CriancaComResumo[] = [];
  carregando = true;

  constructor(
    private dadosService: DadosService,
    private vacinacaoService: VacinacaoService,
    private router: Router,
    private modalCtrl: ModalController
  ) {
    addIcons({ 'chevron-forward-outline': chevronForwardOutline, 'person-circle-outline': personCircleOutline, 'add-outline': addOutline });
  }

  ngOnInit() {
    this.carregarCriancas();
  }

  carregarCriancas() {
    this.dadosService.obterCriancas().pipe(
      switchMap(criancas =>
        combineLatest(
          criancas.map(crianca =>
            this.dadosService.obterRegistros().pipe(
              map(todosRegistros => {
                const registrosDaCrianca = todosRegistros.filter(r => r.criancaId === crianca.id);
                const enriquecidos = this.vacinacaoService.enriquecerComStatus(registrosDaCrianca);

                return {
                  ...crianca,
                  idadeFormatada: this.calcularIdade(crianca.dataNascimento),
                  totalVacinas: enriquecidos.length,
                  totalAplicadas: enriquecidos.filter(r => r.status === 'aplicada').length,
                  totalAtrasadas: enriquecidos.filter(r => r.status === 'atrasada').length
                };
              })
            )
          )
        )
      )
    ).subscribe(criancasComResumo => {
      this.criancas = criancasComResumo;
      this.carregando = false;
    });
  }

  calcularIdade(dataNascimento: string): string {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();

    if (meses < 0) {
      anos--;
      meses += 12;
    }

    if (hoje.getDate() < nascimento.getDate()) {
      meses--;
      if (meses < 0) {
        meses = 11;
        anos--;
      }
    }

    if (anos === 0) {
      return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    }

    return `${anos} ${anos === 1 ? 'ano' : 'anos'}${meses > 0 ? ` e ${meses} ${meses === 1 ? 'mês' : 'meses'}` : ''}`;
  }

  abrirDetalhe(criancaId: string) {
    this.router.navigate(['/crianca-detalhe', criancaId]);
  }

  async abrirModalNovaCrianca() {
  const modal = await this.modalCtrl.create({
    component: ModalCriancaComponent
  });

  await modal.present();

  const { role } = await modal.onWillDismiss();

  if (role === 'confirm') {
    this.carregarCriancas();
  }
}

}
