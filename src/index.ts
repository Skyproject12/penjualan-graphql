import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import cors from 'cors';
import { createConnection } from 'typeorm';
import {schema} from './Schema'
import {Login} from './Database/Entities/Login'
import jwt from 'jsonwebtoken';
interface JwtPayload {
  user: string
}

const loggingMiddleware = (req: any) => {
  let { authorization: token } = req.headers;
  if(token) {
    const {user} = jwt.verify(token, 'penjualan-login') as JwtPayload;
    return {user: user};
  }

  return null;
}

const main = async () => {
  /**
   * Connection database,
   * synchronize, membuat table berdasarkan entity yang tertera
   */
  await createConnection({
    type: "mysql",
    database: "penjualan",
    username: "root",
    password: "",
    logging: true,
    synchronize: false,
    entities: [Login]
  });

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/graphql", graphqlHTTP((req)=>({
    schema,
    graphiql: true,
    context:  {
      member: loggingMiddleware(req)
    }
  })))

  /**
   * Pengaturan jalannya port aplikasi
   */
  app.listen(3002, ()=>{
    console.log("Server running on port 3002");
  })
};

/**
 * Log ketika main error 
 */
main().catch((err)=>{
  console.log(err);
})