import { Sequelize } from 'sequelize-typescript';
import CONFIG from '../config/index';

const {DB_NAME, DB_PASSWORD, DB_HOST, DB_USER, DB_PORT} = CONFIG;

export class Index {
  private static instance: Index;
  private readonly sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      dialect: 'postgres',
      host: DB_HOST,
      port: +DB_PORT,
      modelPaths: [__dirname + '/*.model.js'],
    });
  }

  // this.sequelize = new Sequelize({
  //   name: DB_NAME,
  //   password: DB_PASSWORD,
  //   username: DB_USER,
  //   dialect: 'postgres',
  //   host: DB_HOST,
  //   port: +DB_PORT,
  //   modelPaths: [__dirname + '/*.model.js'],

  public static get db(): Sequelize {
    if (!Index.instance) {
      Index.instance = new Index();
    }

    return Index.instance.sequelize;
  }
}

const DB = Index.db;

export default DB;
