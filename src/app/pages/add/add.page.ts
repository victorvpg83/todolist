import { Component, OnInit } from '@angular/core';
import { WhisesService } from '../../services/whises.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list.model';
import { ListItem } from '../../models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: List
  itemName: ''

  constructor( private whisesService: WhisesService,
               private route: ActivatedRoute ) {

  const listId = this.route.snapshot.paramMap.get('listId')
  this.list = this.whisesService.obtainList( listId )
}

  ngOnInit() {
  }

  addItem() {
    if ( this.itemName.length === 0 ) {
      return
    }

    const newItem = new ListItem( this.itemName )
    this.list.items.push( newItem )

    this.itemName = ''
    this.whisesService.saveStorage()

  }

  changeCheck( item: ListItem ) {

    const pendings = this.list.items.filter( itemData => !itemData.completed ).length

    if (pendings === 0) {
      this.list.finishedAt = new Date()
      this.list.finish = true
    } else {
      this.list.finishedAt = null
      this.list.finish = false
    }

    this.whisesService.saveStorage()

    console.log(this.whisesService.lists)
  }

  delete( i: number ) {
    this.list.items.splice( i, 1 )
    this.whisesService.saveStorage()
  }
}
