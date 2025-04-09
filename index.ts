
import { QueryTokeniser } from "./tokeniser.ts";
import { Comparator } from "./types.ts";

/*
 * A synchronous search-engine that searches through a list of content
 * and returns the relevant content efficiently. Designed to scale out to a few tens of
 * thousands of items.
 */
export class HaystackSearchEngine<T> {
  content;
  comparators;

  constructor(content: T[], comparators: Record<string, Comparator<any, any>>) {
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
  *search(queryText: string): Iterator<T> {
    const tokeniser = new QueryTokeniser();
    const tokens = tokeniser.tokenise(queryText);

    for (const content of this.content) {
      let allMatch = true;

      for (const { relation, subquery } of tokens) {
        if (!relation || !subquery) {
          continue; // todo: stronger typing
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
}
