
import { Photos } from "./tests/content.ts";
import { QueryTokeniser } from "./tokeniser.ts";

/*
 * A synchronous search-engine that searches through a list of content
 * and returns the relevant content efficiently. Designed to scale out to a few tens of
 * thousands of items.
 */
class HaystackSearchEngine<T> {
  content: T[];

  constructor(content: T[]) {
    this.content = content;
  }

  /*
   * Search across the provided content for entries that match the
   * expected query criteria.
   *
   * @param query The query string to search for.
   * @returns An iterator of the search results.
   */
  *search(queryText: string): Iterator<T> {
    const tokeniser = new QueryTokeniser();
    const tokens = tokeniser.tokenise(queryText);

    console.log(tokens)

    yield this.content[0];
  }
}

// test things out
const engine = new HaystackSearchEngine(
  Photos()
);

for (const item of engine.search("before:Winter after:2024")) {
  console.log(item);
}
