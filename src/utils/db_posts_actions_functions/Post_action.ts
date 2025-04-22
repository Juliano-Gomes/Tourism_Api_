import { create_db } from "../countries";
import { DB_Queries } from "../database/table.pg";

type dt={
    id: string;
    name: string;
    author:string;
    description: string;
    country: string;
    image: string;
}
export class Create_a_new_field {
    //constructor(parameters) {}
    public add_a_static_field(data:dt){

        const res = create_db(data)
        if(res){
            return {
                status: true,
                message: "Field created successfully",
            }
        }else{
            return {
                status: false,
                message: "Error creating field",
            }
        }
    }
    public async add_data_to_db(data:dt){
        const db = new DB_Queries();
        const res= await db.REGISTER_POST(data) 
        if(res.status){
            return {
                status: true,
                message: "Field created successfully",
            }
        }else{
            return {
                status: false,
                message: "Error creating field :(",
            }
        }
    }
}