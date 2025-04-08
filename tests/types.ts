import { SearchableTypes, View } from "../types.ts";

export type Optional<T> = T | undefined;

/*
 * A unified
type-definition
 */
export type Photo = {
  species?: string;
  wildlife?: string;
  hasWater?: string;
  rating?: string;
  aperture?: string;
  iso?: string;
  camera?: string;
  style?: string;
  date?: Date;
};

export type PhotoView<T extends SearchableTypes> = View<Photo, T>;
