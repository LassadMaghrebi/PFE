export class Reservation{
    id:number
    userId:number
    date:Date
    constructor(id:number,userId:number,date:Date){
        this.id=id
        this.userId=userId
        this.date=date
    }
}