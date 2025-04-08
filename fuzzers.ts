import * as P from "https://deno.land/x/peach_ts/src/mod.ts";

const U = P.Number.uniform;

export const WhiteSpace = P.String.from(
  P.String.space(),
  U(0, 3),
);

export const Relation = P.String.from(
  P.String.letters(U),
  U(1, 10),
);

export const UnquotedArgument = P.String.from(
  P.Logic.oneOf(U, [
    P.String.letters(U),
    P.String.digit(U),
  ]),
  U(1, 10),
);

export const QuotedArgument = P.String.concat(
  '"',
  P.String.from(
    P.Logic.oneOf(U, [
      P.String.letters(U),
      P.String.digit(U),
      P.String.space(),
      P.String.tab(),
    ]),
    U(1, 10),
  ),
  '"',
);

export const RelationPair = P.String.concat(
  WhiteSpace,
  Relation,
  WhiteSpace,
  ":",
  WhiteSpace,
  P.Logic.oneOf(U, [UnquotedArgument, QuotedArgument]),
  WhiteSpace,
);

export const Query = P.String.from(
  RelationPair,
  U(1, 5),
);
