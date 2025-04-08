export type SearchableTypes =
  | string
  | boolean
  | number
  | Date;

export type View<T, K extends SearchableTypes> = (x: T) => K;

export type RelationCall = {
  relation?: string;
  subquery?: string;
};