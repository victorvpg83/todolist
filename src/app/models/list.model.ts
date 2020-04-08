import { ListItem } from './list-item.model'


export class List {

    id: number
    title: string
    cretatedAt: Date
    finishedAt: Date
    finish: boolean
    items: ListItem[]

    constructor( title: string ) {

        this.title = title
        this.cretatedAt = new Date()
        this.finish = false
        this.items = []
        this.id = new Date().getTime()
    }
}
