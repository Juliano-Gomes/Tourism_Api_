import { db_connector } from "./conection";

type dt={
    id:string,
    name:string,
    email:string,
    token:string,
    password:string,
    country:string
}

type POST_dt={
    name:string,
    author:string,
    image:string,
    country:string,
    description:string
}

export class DB_Queries {
    //constructor() {}
    public async Table(){
        const client = await db_connector.connect()
    
        //creating table Users and Posts
        const  query_1 = `
        CREATE TABLE IF NOT EXISTS USERS_DATA (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          token VARCHAR(100) NOT NULL,
          country VARCHAR(100) NOT NULL,
          passwd VARCHAR(100) NOT NULL,
          createdAt TIMESTAMP DEFAULT NOW()
        );
        `; 

        const  query_2 = `
        CREATE TABLE IF NOT EXISTS POST_USERS (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            author VARCHAR(100)  NOT NULL,
            country VARCHAR(100) NOT NULL,
            description VARCHAR(100) NOT NULL,
            imageLink VARCHAR(100) NOT NULL,
            createdAt TIMESTAMP DEFAULT NOW()
        );
        `; 

        //executing the query
        try {
            await client.query(query_1);
            await client.query(query_2);
        } catch (error) {
            console.log("an error creating tables users and post")
        }finally{
            client.release();
        }
    }

    public async REGISTER_USER(data:dt){
        await this.Table()
        const client = await db_connector.connect()
        const query = `
        INSERT INTO USERS_DATA (id,name,email,token,country,passwd,createdAt)
        VALUES ($1,$2,$3,$4,$5,$6,now())
        RETURNING *;`
        try {
            const result = await client.query(query, [data.id,data.name,data.email,data.token,data.country,data.password]);
            await client.query('COMMIT');
            //console.log(result.rows[0])
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            console.log("an error while creating user")
        }finally{
            client.release();
        }
    }

    public async Log_in_USER(data:{email:string}){
        await this.Table()
        const client = await db_connector.connect()
        const query = `
        SELECT * FROM USERS_DATA WHERE email = $1;`
        try {
            const result = await client.query(query, [data.email]);
            //console.log(result.rows)
            return {
                status:true,
                data:result.rows
            };
        } catch (error) {
            await client.query('ROLLBACK');
            console.log("an error while selecting account")
            return {
                status:false,
            }
        }finally{
            client.release();
        }
    }

    public async DELETE(id:string){
        await this.Table()
        const client = await db_connector.connect()
        const query = `
        DELETE FROM USERS_DATA WHERE id = $1 RETURNING *;
        `;
        try {
            const result = await client.query(query, [id]);
            await client.query('COMMIT');
            if(result.rows[0]){
                return {
                    deleted:true,
                    message:"user deleted from database"
                }
            }else{
                await client.query('ROLLBACK');
                return {
                    message:"we couldn't delete the account :(",
                    deleted:false,
                }
            }
        } catch (error) {
            await client.query('ROLLBACK');
            return {
                message:"we couldn't delete the account ",
                deleted:false,
            }
        }finally{
            client.release();
        }
    }

    public async REGISTER_POST(data:POST_dt){
        await this.Table()
        const client = await db_connector.connect()
        const query =`
            INSERT INTO POST_USERS(name,author,imageLink,country,description,createdAt) VALUES($1,$2,$3,$4,$5,now()) RETURNING *;
        `
        try {
            const res = await client.query(query,[data.name,data.author,data.image,data.country,data.description])
            //console.log(res.rows[0]) 
            return {
                status:true
            }
        } catch (error) {
            await client.query('ROLLBACK');
            console.log(error)
            return {
                status:false
            }
        }finally{
            client.release();
        }
    }

    public async FIND_PLACE(name:string,limit:number){
        await this.Table()
        const client = await db_connector.connect()
        const query = `
        SELECT * FROM POST_USERS WHERE name=$1 LIMIT $2 OFFSET 0`
        try {
            const rs = await client.query(query,[name,limit])
            console.log(rs.rows[0])
            return {
                data:rs.rows,
                status:true
            };
        } catch (error) {
            await client.query('ROLLBACK');
            //console.log("an error while selecting")
            return {
                status:false
            }
        }finally{
            client.release();
        }
    }

    public async DELETE_PLACE(id:number){
        await this.Table()
        const client = await db_connector.connect()
        const query = `
        DELETE FROM POST_USERS WHERE id = $1 RETURNING *;
        `;
        try {
            const result = await client.query(query, [id]);
            await client.query('COMMIT');
            
            if(result.rows[0]){
                //console.log(result.rows[0])
                return {
                    deleted:true,
                    message:"user deleted from database",
                    data:result.rows
                }
            }else{
                await client.query('ROLLBACK');
                return {
                    message:"we couldn't delete the account :(",
                    deleted:false,
                }
            }
        } catch (error) {
            await client.query('ROLLBACK');
            return {
                message:"we couldn't delete the account ",
                deleted:false,
            }
        }finally{
            client.release();
        }
    }

    public async UPDATE_POST(data:{id:number,description:string}){
        await this.Table()
        const client = await db_connector.connect()
        const query = `
        UPDATE POST_USERS SET description = $1 WHERE id = $2 RETURNING *;
        `;
        try {
            const result = await client.query(query, [data.description, data.id]);
            await client.query('COMMIT');
            console.log(result.rows[0])
            return true
        }catch(error){
            await client.query('ROLLBACK');
            console.log(error)
            return false
        }finally{
            client.release();
        }
    }

    public async NEW(limit:number){
        await this.Table()
        const client = await db_connector.connect()
        const query = `
        SELECT * FROM POST_USERS LIMIT $1 OFFSET 0`
        try {
            const rs = await client.query(query,[limit])
            //console.log(rs.rows[0])
            return {
                data:rs.rows,
                status:true
            };
        } catch (error) {
            await client.query('ROLLBACK');
            //console.log("an error while selecting")
            return {
                status:false
            }
        }finally{
            client.release();
        }
    }
}