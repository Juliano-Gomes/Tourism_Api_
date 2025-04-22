import {unlink} from 'fs/promises'

import { db_country, delete_db } from "../countries";
import { DB_Queries } from '../database/table.pg';
import path from 'path';

const del = async (filename : string)=>{
    try {
        const res = await unlink(filename)
        //console.log(res)
        return true
    } catch (error) {
        return false
    }
}


export class delete_A_info_in_data {
    //constructor(parameters) {}
    public async  delete_a_static_info(id:string){
        try {
            const dt = db_country.filter(i => { return i.id == id })
            
            if (dt.length == 1) {       
                const upres = await  del(dt[0].image)  
                if (upres) {
                    const res = delete_db(id)
                    if(res){
                        return {
                            status : true,
                            message : "Data deleted successfully"
                        }
                    }else{
                            return {
                                status : false,
                                message : "Error deleting data"
                            }
                    }                    
                } else {
                    return {
                        status : false,
                        message : "Error deleting data"
                    }  
                } 

            } else {
                return {
                    status : false,
                    message : "Error deleting data"
                } 
            }
        } catch (error) {
            return {
                status : false,
                message : "Error deleting data"
            }
        }
    }
    public async delete_data_in_db(id:string){
        try {
            //const dt = db_country.filter(i => { return i.id == id })
            const db = new DB_Queries()
            const INDEX = parseInt(id)
            const dt = await db.DELETE_PLACE(INDEX)
            if (dt.data?.length == 1) {    
                console.log(dt.data)   
                const fileLInk =  path.join(__dirname,"..","..", "cities",dt.data[0].imagelink);
                console.log(fileLInk)
                const upres = await del(fileLInk)  
                if (upres) {
                    return {
                        status : true,
                        message : "Data deleted successfully"
                    }
                                 
                } else {
                    return {
                        status : false,
                        message : "Error deleting data :::("
                    }  
                } 

            } else {
                return {
                    status : false,
                    message : "Error deleting data ::("
                } 
            }
        } catch (error) {
            console.log(error)
            return {
                status : false,
                message : "Error deleting data :("
            }
        }
    }
}