export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    roles: string[];
    assigned: boolean;

    isRole(role:String){
        if(!this.roles)return false;
        let trovato=false;
        this.roles.forEach((r)=>{
            if(r===role){
                trovato=true;
            }
        });
        return trovato;
    }
}