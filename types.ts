
export type RelationCall = {
  relation?: string;
  subquery?: string;
};

export type Comparator<T,K> = (obj: T, value: K) => boolean;
