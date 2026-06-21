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
  IonInput
} from '@ionic/angular/standalone';
import { DadosService } from '../../services/dados';

@Component({
  selector: 'app-modal-crianca',
  templateUrl: './modal-crianca.component.html',
  styleUrls: ['./modal-crianca.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonItem, IonLabel, IonInput
  ]
})
export class ModalCriancaComponent implements OnInit {

  nome = '';
  dataNascimento = '';
  nomeResponsavel = '';

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
    return this.nome.trim().length > 0 && this.dataNascimento.trim().length > 0;
  }

  async salvar() {
    if (!this.camposValidos()) {
      return;
    }

    this.salvando = true;

    try {
      await this.dadosService.adicionarCrianca({
        nome: this.nome.trim(),
        dataNascimento: this.dataNascimento,
        nomeResponsavel: this.nomeResponsavel.trim() || undefined
      });

      this.modalCtrl.dismiss({ sucesso: true }, 'confirm');
    } catch (erro) {
      console.error('Erro ao salvar criança:', erro);
      alert('Erro ao salvar. Tente novamente.');
    } finally {
      this.salvando = false;
    }
  }
}