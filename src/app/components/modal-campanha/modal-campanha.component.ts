import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea
} from '@ionic/angular/standalone';
import { DadosService } from '../../services/dados';

@Component({
  selector: 'app-modal-campanha',
  templateUrl: './modal-campanha.component.html',
  styleUrls: ['./modal-campanha.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonItem, IonLabel, IonInput, IonTextarea
  ]
})
export class ModalCampanhaComponent implements OnInit {

  titulo = '';
  descricao = '';
  publicoAlvo = '';
  dataInicio = '';
  dataFim = '';

  salvando = false;

  constructor(
    private modalCtrl: ModalController,
    private dadosService: DadosService
  ) { }

  ngOnInit() {}

  fechar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  camposValidos(): boolean {
    return this.titulo.trim().length > 0 &&
      this.publicoAlvo.trim().length > 0 &&
      this.dataInicio.trim().length > 0 &&
      this.dataFim.trim().length > 0;
  }

  async salvar() {
    if (!this.camposValidos()) {
      return;
    }

    this.salvando = true;

    try {
      await this.dadosService.adicionarCampanha({
        titulo: this.titulo.trim(),
        descricao: this.descricao.trim(),
        publicoAlvo: this.publicoAlvo.trim(),
        dataInicio: this.dataInicio,
        dataFim: this.dataFim
      });

      this.modalCtrl.dismiss({ sucesso: true }, 'confirm');
    } catch (erro) {
      console.error('Erro ao salvar campanha:', erro);
      alert('Erro ao salvar. Tente novamente.');
    } finally {
      this.salvando = false;
    }
  }
}
