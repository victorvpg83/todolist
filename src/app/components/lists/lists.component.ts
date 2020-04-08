import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WhisesService } from '../../services/whises.service';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild(IonList, {static: true}) list: IonList
  @Input() finished = true

  constructor( public wishesService: WhisesService,
               private router: Router,
               private alertCtrl: AlertController ) { }

  ngOnInit() {}


  selectedList( list: List ) {

    this.finished ? this.router.navigateByUrl(`/tabs/tab2/add/${ list.id }`) : this.router.navigateByUrl(`/tabs/tab1/add/${ list.id }`)
  }

  deleteList( list: List ) {
    this.wishesService.deleteList( list )
  }

  async listEdit( list: List ) {
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.list.closeSlidingItems()
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            console.log(data)
            if ( data.title.length === 0 ) {
              return
            }

            list.title = data.title
            this.wishesService.saveStorage()
            this.list.closeSlidingItems()

          }
        }
      ]
    })

    alert.present()

  }
}
