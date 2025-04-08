/*
 * Valid queries that the search engine should support
 */

import * as P from "https://deno.land/x/peach_ts/src/mod.ts";
import { QueryTokeniser } from "../tokeniser.js";

const U = P.Number.uniform;

export function EntityName() {
  return P.String.from(
    P.String.lowercaseLetters(U),
    U(1, 10),
  );
}

export function QuotedEntityName() {
  return P.String.concat(
    '"',
    P.String.from(
      () => {
        return P.Logic.oneOf(U, [
          P.String.space(),
          P.String.lowercaseLetters(U),
        ])();
      },
      U(3, 20),
    ),
    '"',
  );
}

export function Relation() {
  return P.String.concat(
    P.Logic.oneOf(U, QueryTokeniser.RELATIONS),
    ":",
  );
}

export function Spaces() {
  return P.String.from(P.String.space(), U(0, 5))();
}

export function RelationCall() {
  return P.String.concat(
    Relation(),
    Spaces(),
    P.Logic.oneOf(U, [
      EntityName(),
      QuotedEntityName(),
    ]),
  );
}

export function Operator() {
  return P.Logic.oneOf(U, ["and", "or", ""])();
}

export function Expression() {
  const range = U(0, 10)() * 2;
  const tokens = [];

  for (let idx = 0; idx < range; idx++) {
    tokens.push(RelationCall()());
    tokens.push(Operator());
  }

  tokens.pop();

  return P.String.concat(
    Spaces(),
    tokens.join(" "),
    Spaces(),
  )();
}
