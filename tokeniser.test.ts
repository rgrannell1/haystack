import { Query } from "./fuzzers.ts";
import { QueryTokeniser } from "./js/tokeniser.js";

Deno.test({
  name: "Test the tokeniser works over expected inputs",
  fn() {
    const tokeniser = new QueryTokeniser();

    for (let idx = 0; idx < 100; idx++) {
      console.log();
      tokeniser.tokenise(Query());
    }
  },
});
