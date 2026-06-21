import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {IonApp, IonRouterOutlet, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { peopleOutline, megaphoneOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    CommonModule,IonApp,IonRouterOutlet,IonSplitPane,IonMenu,IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonIcon,IonLabel
  ],
})
export class AppComponent {

  paginas = [
    { titulo: 'Crianças', url: '/criancas', icone: 'people-outline' },
    { titulo: 'Campanhas', url: '/campanhas', icone: 'megaphone-outline' }
  ];

  constructor(private router: Router) {
    addIcons({ 'people-outline': peopleOutline, 'megaphone-outline': megaphoneOutline });
  }

  navegarPara(url: string) {
    this.router.navigateByUrl(url);
  }
}
