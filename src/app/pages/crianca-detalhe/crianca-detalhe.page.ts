import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonIcon,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, timeOutline, alertCircleOutline } from 'ionicons/icons';
import { combineLatest, map } from 'rxjs';
import { DadosService } from '../../services/dados';
import { VacinacaoService } from '../../services/vacinacao';
import { Crianca } from '../../models/crianca.model';
import { StatusVacina } from '../../models/registro-vacina.model';

interface RegistroExibicao {
  id: string;
  nomeVacina: string;
  dose: string;
  dataPrevista: string;
  dataAplicada?: string;
  status: StatusVacina;
}

@Component({
  selector: 'app-crianca-detalhe',
  templateUrl: './crianca-detalhe.page.html',
  styleUrls: ['./crianca-detalhe.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonList, IonItem,
    IonLabel, IonBadge, IonIcon, IonCard, IonCardContent,
    CommonModule, FormsModule
  ]
})
export class CriancaDetalhePage implements OnInit {

  crianca: Crianca | undefined;
  registros: RegistroExibicao[] = [];
  carregando = true;

  totalAplicadas = 0;
  totalPendentes = 0;
  totalAtrasadas = 0;

  constructor(
    private route: ActivatedRoute,
    private dadosService: DadosService,
    private vacinacaoService: VacinacaoService
  ) {
    addIcons({
      'checkmark-circle-outline': checkmarkCircleOutline,
      'time-outline': timeOutline,
      'alert-circle-outline': alertCircleOutline
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarDados(id);
    }
  }

  carregarDados(criancaId: string) {
    combineLatest([
      this.dadosService.obterCriancaPorId(criancaId),
      this.dadosService.obterRegistros(),
      this.dadosService.obterVacinas()
    ]).pipe(
      map(([crianca, registros, vacinas]) => {
        const registrosDaCrianca = registros.filter(r => r.criancaId === criancaId);
        const enriquecidos = this.vacinacaoService.enriquecerComStatus(registrosDaCrianca);

        const registrosExibicao: RegistroExibicao[] = enriquecidos.map(registro => {
          const vacina = vacinas.find(v => v.id === registro.vacinaId);
          return {
            id: registro.id,
            nomeVacina: vacina?.nome ?? 'Vacina desconhecida',
            dose: vacina?.dose ?? '',
            dataPrevista: registro.dataPrevista,
            dataAplicada: registro.dataAplicada,
            status: registro.status
          };
        }).sort((a, b) => new Date(a.dataPrevista).getTime() - new Date(b.dataPrevista).getTime());

        return { crianca, registrosExibicao };
      })
    ).subscribe(({ crianca, registrosExibicao }) => {
      this.crianca = crianca;
      this.registros = registrosExibicao;

      this.totalAplicadas = registrosExibicao.filter(r => r.status === 'aplicada').length;
      this.totalPendentes = registrosExibicao.filter(r => r.status === 'pendente').length;
      this.totalAtrasadas = registrosExibicao.filter(r => r.status === 'atrasada').length;

      this.carregando = false;
    });
  }

  corDoStatus(status: StatusVacina): string {
    switch (status) {
      case 'aplicada': return 'secondary';
      case 'atrasada': return 'warning';
      case 'pendente': return 'tertiary';
    }
  }

  iconeDoStatus(status: StatusVacina): string {
    switch (status) {
      case 'aplicada': return 'checkmark-circle-outline';
      case 'atrasada': return 'alert-circle-outline';
      case 'pendente': return 'time-outline';
    }
  }

  textoDoStatus(status: StatusVacina): string {
    switch (status) {
      case 'aplicada': return 'Aplicada';
      case 'atrasada': return 'Atrasada';
      case 'pendente': return 'Pendente';
    }
  }

  formatarData(data?: string): string {
    if (!data) return '-';
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
  }
}
