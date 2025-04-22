import { db_country } from "../countries";
import { DB_Queries } from "../database/table.pg";

export class get_A_array_Of_Countries {
    //constructor(name:string) {}
    public  get_From_static_data(name:string){
      const data = db_country.filter(e=>e.name.toLowerCase() == name.toLowerCase())
      if(data.length > 0){
        return {status:true,data:data};
      }else{
        return {
          status:false
        }
      }
    }
    public async get_From_database(name:string,limit:number){
      //const data = db_country.filter(e=>e.name.toLowerCase() == name.toLowerCase())
      const db = new DB_Queries();
      const data = await db.FIND_PLACE(name.toLowerCase(),limit)
      if(data.status && data.data?.length! > 0){
        return {status:true,data:data.data};
      }else{
        return {
          status:false
        }
      }
    }
}