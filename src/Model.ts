export enum DndItemType {
  ENTRY = 'ENTRY',
}

export enum EntryType {
  FILE = 'FILE',
  DIRECTORY = 'DIRECTORY',
}

export interface DirectoryDragObject {
  entryType: EntryType;
  id: ID;
}

export function isDirectoryDragObject(item: any): item is DirectoryDragObject {
  return typeof item === 'object' && 'entryType' in item;
}

export type ID = string;
