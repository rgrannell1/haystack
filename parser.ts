import { RelationCall } from "./types.ts";

/* */
export class QueryParser {
  relations;

  constructor(relations: string[]) {
    this.relations = relations;
  }

  findRelation(relname: string) {
    return this.relations.find((candidate) => {
      return candidate.name === relname;
    });
  }

  parse(tokens: RelationCall[]) {
    return tokens.map((token) => {
      const relation = this.findRelation(token.relation);
      if (!relation) {
        throw new Error(`Unknown relation: ${token.relation}`);
      }

      return {
        relation,
        argument: relation.parseSubquery(token.subquery),
      };
    });
  }
}
