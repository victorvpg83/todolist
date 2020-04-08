import { Injectable } from '@angular/core'
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class WhisesService {

  lists: List[] = []

  constructor() {

    this.loadStorage()

   }

  createList( title: string ) {
    const newList = new List( title )
    this.lists.push( newList )
    this.saveStorage()

    return newList.id
  }

  obtainList( id: string | number ) {

    id = Number(id)

    return this.lists.find( dataList => dataList.id === id )

  }

  deleteList( list: List ) {
   this.lists = this.lists.filter( listData => listData.id !== list.id )
   this.saveStorage()
  }

  saveStorage() {
    localStorage.setItem( 'data', JSON.stringify( this.lists ) )
  }

  loadStorage() {

    localStorage.getItem( 'data' ) ? this.lists = JSON.parse( localStorage.getItem( 'data' ) ) : this.lists = []

  }
}
