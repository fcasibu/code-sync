// should only contain lowercased values
export enum RecordType {
  USER = 'user',
}

export interface PrismaRecord<T> {
  type: RecordType;
  data: T[];
}
