import { QueryTokeniser } from "../tokeniser.js";
import { Expression } from "./query.js";

const tokeniser = new QueryTokeniser();

// Check it doesn't blow up the tokeniser
for (let idx = 0; idx < 1000; idx++) {
  const query = Expression();
  const tokens = tokeniser.tokenise(query);

  console.log(tokens);
}
