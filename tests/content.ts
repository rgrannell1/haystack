import * as P from "https://deno.land/x/peach_ts/src/mod.ts";
const { uniform: U } = P.Number;

const Rating = P.Logic.oneOf(U, [
  "⭐",
  "⭐⭐",
  "⭐⭐⭐",
  "⭐⭐⭐⭐",
  "⭐⭐⭐⭐⭐",
]);
const Aparture = P.Logic.oneOf(U, [
  1.4,
  2.8,
  4,
  5.6,
  8,
]);

const ISO = P.Logic.oneOf(U, [
  100,
  200,
  400,
  800,
  1600,
]);
const Camera = P.Logic.oneOf(U, [
  "Pixel 8 Pro",
  "GH5",
  "GH6",
]);
const BirdSpecies = P.Logic.oneOf(U, [
  "Crex Crex",
  "Gallinago Gallinago",
  "Circus Aeruginosus",
  "Ciconia Ciconia",
  "Cygnus Cygnus",
]);

// broken in peach; patch
const Bool = P.Logic.oneOf(U, [true, false]);

function CommonPhoto() {
  return {
    hasWater: Bool(),
    rating: Rating(),
    aperture: Aparture(),
    iso: ISO(),
    camera: Camera(),
    // TODO date
  };
}

function DeerPhoto() {
  return {
    wildlife: "Mammal",
    ...CommonPhoto(),
  };
}

function BirdPhoto() {
  return {
    species: BirdSpecies(),
    wildlife: "Bird",
    ...CommonPhoto(),
  };
}

function BuildingPhoto() {
  return {
    style: "Cityscape",
    ...CommonPhoto(),
  };
}

/*
 * The actual content-type we'll use for testing
 * properties have a fixed type, but may be optional.
 */
export const Photo = P.Logic.oneOf(U, [
  DeerPhoto,
  BirdPhoto,
  BuildingPhoto,
] as any);

export const Photos = P.Array.from(
  Photo,
  10
);
