/*
 * Tokenises the provided Haystack query into a list of
 * relation:subquery pairs
 */

import { RelationCall } from "./types.ts";

const RELATION_PATTERN = /^\s*([a-zA-Z]+)\:/;
const QUOTED_ARGUMENT = /^\s*"([^\"]+?)"/;
const UNQUOTED_ARGUMENT = /^\s*([^\s]+)/;

export class QueryStates {
  static START = "START";
  static RELATION = "RELATION";
  static SUBQUERY = "SUBQUERY";
  static END = "END";
}

export class QueryTokeniser {
  state;
  lastState;

  constructor() {
    this.state = QueryStates.RELATION;
    this.lastState = QueryStates.START;
  }

  parseRelation(query: string): [string, string] {
    const match = query.match(RELATION_PATTERN);
    if (!match) {
      throw new SyntaxError(
        `failed while parsing relationship: ${query}, expected relation`,
      );
    }

    return [match[1], query.slice(match[0].length)];
  }

  parseSubquery(query: string): [string, string] {
    const quotedMatch = query.match(QUOTED_ARGUMENT);
    if (quotedMatch) {
      return [quotedMatch[1], query.slice(quotedMatch[0].length)];
    }

    const unquotedMatch = query.match(UNQUOTED_ARGUMENT);
    if (unquotedMatch) {
      return [unquotedMatch[1], query.slice(unquotedMatch[0].length)];
    }

    throw new SyntaxError(
      `subquery: failed to parse query: ${query}, expected subquery`,
    );
  }

  advanceState(state: string): void {
    this.lastState = this.state;
    this.state = state;
  }

  tokenise(query: string): Required<RelationCall>[] {
    let rest = query.trim();
    const tokens = [];

    const relationCall: RelationCall = {};

    while (rest.length > 0) {
      if (this.state === QueryStates.RELATION) {
        const results = this.parseRelation(rest);

        relationCall.relation = results[0];
        rest = results[1];

        this.advanceState(QueryStates.SUBQUERY);
        continue;
      }

      if (this.state === QueryStates.SUBQUERY) {
        const results = this.parseSubquery(rest);

        relationCall.subquery = results[0];
        rest = results[1];

        tokens.push({ ...relationCall });
        rest = results[1];

        this.advanceState(QueryStates.RELATION);
        continue;
      }

      if (this.state === this.lastState) {
        throw new SyntaxError(
          `failed to parse query: ${query}, expected relation`,
        );
      }
    }

    for (const token of tokens) {
      if (!token.relation) {
        throw new SyntaxError(
          `failed to parse query: ${query}, expected relation`,
        );
      }

      if (!token.subquery) {
        throw new SyntaxError(
          `failed to parse query: ${query}, expected subquery`,
        );
      }
    }

    return tokens as Required<RelationCall>[];
  }
}
