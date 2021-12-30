export class Users
{
    id : string;
    nom : string;
    prenom : string;
    phone : string;
    constructor(id: any, nom: any, prenom: any, phone: any){
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.phone = phone;
    }
}