// tokeniser.ts
var RELATION_PATTERN = /^\s*([a-zA-Z]+)\:/;
var QUOTED_ARGUMENT = /^\s*"([^\"]+?)"/;
var UNQUOTED_ARGUMENT = /^\s*([^\s]+)/;
var QueryStates = class {
  static START = "START";
  static RELATION = "RELATION";
  static SUBQUERY = "SUBQUERY";
  static END = "END";
};
var QueryTokeniser = class {
  state;
  lastState;
  constructor() {
    this.state = QueryStates.RELATION;
    this.lastState = QueryStates.START;
  }
  parseRelation(query) {
    const match = query.match(RELATION_PATTERN);
    if (!match) {
      throw new SyntaxError(
        `failed while parsing relationship: ${query}, expected relation`
      );
    }
    return [match[1], query.slice(match[0].length)];
  }
  parseSubquery(query) {
    const quotedMatch = query.match(QUOTED_ARGUMENT);
    if (quotedMatch) {
      return [quotedMatch[1], query.slice(quotedMatch[0].length)];
    }
    const unquotedMatch = query.match(UNQUOTED_ARGUMENT);
    if (unquotedMatch) {
      return [unquotedMatch[1], query.slice(unquotedMatch[0].length)];
    }
    throw new SyntaxError(
      `subquery: failed to parse query: ${query}, expected subquery`
    );
  }
  advanceState(state) {
    this.lastState = this.state;
    this.state = state;
  }
  tokenise(query) {
    let rest = query.trim();
    const tokens = [];
    const relationCall = {};
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
          `failed to parse query: ${query}, expected relation`
        );
      }
    }
    for (const token of tokens) {
      if (!token.relation) {
        throw new SyntaxError(
          `failed to parse query: ${query}, expected relation`
        );
      }
      if (!token.subquery) {
        throw new SyntaxError(
          `failed to parse query: ${query}, expected subquery`
        );
      }
    }
    return tokens;
  }
};

// index.ts
var HaystackSearchEngine = class {
  content;
  comparators;
  constructor(content, comparators) {
    this.content = content;
    this.comparators = comparators;
  }
  /*
   * Search across the provided content for entries that match the
   * expected query criteria.
   *
   * @param query The query string to search for.
   * @returns An iterator of the search results.
   */
  *search(queryText) {
    const tokeniser = new QueryTokeniser();
    const tokens = tokeniser.tokenise(queryText);
    for (const content of this.content) {
      let allMatch = true;
      for (const { relation, subquery } of tokens) {
        if (!relation || !subquery) {
          continue;
        }
        const relComparator = this.comparators[relation];
        if (!relComparator) {
          allMatch = false;
        } else if (!allMatch) {
          continue;
        }
        allMatch = allMatch && relComparator(content, subquery);
      }
      if (allMatch) {
        yield content;
      }
    }
  }
};
export {
  HaystackSearchEngine
};
