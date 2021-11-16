import { Model } from "objection";

export class Violation extends Model {
  static get tableName() {
    return "violations";
  }

  id!: string;
  license!: string;
  address!: string;
  violation!: string;
  deleted!: string;

  createdAt!: string;
  updatedAt!: string;

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}


