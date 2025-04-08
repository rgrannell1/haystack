/*
 * Natural language date parsing is required for date range queries
 */

import * as P from "https://deno.land/x/peach_ts/src/mod.ts";
const U = P.Number.uniform;

export function RelativeDateNamed() {
  return P.Logic.oneOf(U, [
    "yesterday",
    "today",
  ]);
}

export function SpeltNumber() {
  return P.Logic.oneOf(U, [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
  ]);
}
