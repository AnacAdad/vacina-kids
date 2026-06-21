import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ModalController} from '@ionic/angular/standalone';
import {ModalCampanhaComponent} from '../../components/modal-campanha/modal-campanha.component';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { megaphoneOutline, calendarOutline, addOutline } from 'ionicons/icons';
import { map } from 'rxjs';
import { DadosService } from '../../services/dados';
import { Campanha } from '../../models/campanha.model';

interface CampanhaExibicao extends Campanha {
  ativa: boolean;
  periodoFormatado: string;
}

@Component({
  selector: 'app-campanhas',
  templateUrl: './campanhas.page.html',
  styleUrls: ['./campanhas.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonMenuButton, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent,
    IonBadge, IonIcon,
    IonFab, IonFabButton,
    CommonModule, FormsModule
  ]
})
export class CampanhasPage implements OnInit {

  campanhas: CampanhaExibicao[] = [];
  carregando = true;

  constructor(private dadosService: DadosService, private modalController: ModalController) {
    addIcons({ 'megaphone-outline': megaphoneOutline, 'calendar-outline': calendarOutline, 'add-outline': addOutline });
  }

  ngOnInit() {
    this.carregarCampanhas();
  }

  carregarCampanhas() {
    this.dadosService.obterCampanhas().pipe(
      map(campanhas => {
        const hoje = new Date();

        return campanhas.map(campanha => {
          const inicio = new Date(campanha.dataInicio);
          const fim = new Date(campanha.dataFim);
          const ativa = hoje >= inicio && hoje <= fim;

          return {
            ...campanha,
            ativa,
            periodoFormatado: `${this.formatarData(campanha.dataInicio)} a ${this.formatarData(campanha.dataFim)}`
          };
        }).sort((a, b) => (a.ativa === b.ativa ? 0 : a.ativa ? -1 : 1));
      })
    ).subscribe(campanhasComStatus => {
      this.campanhas = campanhasComStatus;
      this.carregando = false;
    });
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  async abrirModalNovaCampanha() {
  const modal = await this.modalController.create({
    component: ModalCampanhaComponent
  });

  await modal.present();

  const { role } = await modal.onWillDismiss();

  if (role === 'confirm') {
    this.carregarCampanhas();
  }
}
}
