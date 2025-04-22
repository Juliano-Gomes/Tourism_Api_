import { db_country, update_db } from "../countries"
import { DB_Queries } from "../database/table.pg"

type up_data={
    id:string,
    description:string
}

export class update_A_Field_in_data {
    //constructor(parameters) {}
    public update_field_static_data(data:up_data){
        const new_array = db_country.map(e=>{
            if(e.id == data.id){
                return {
                    ...e,
                    description:data.description
                }
            }else{
                return e
            }
        })
        //console.log(new_array)
        const res = update_db(new_array)
        if(res){
            return {
                status : true,
                message : "Data updated successfully"
            }
        }else{
            return {
                status : false,
                message : "we couldn't update your post's description  :( "
            }
        }
        
    }
    public async update_field_from_database(data:up_data){
        const new_array = new DB_Queries()
        //console.log(new_array)
        //const res = update_db(new_array)
        const res =await  new_array.UPDATE_POST({id:parseInt(data.id),description:data.description})
        if(res){
            return {
                status : true,
                message : "Data updated successfully"
            }
        }else{
            return {
                status : false,
                message : "we couldn't update your post's description  :( "
            }
        }
    }
}