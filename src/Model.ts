export enum DndItemType {
  DIRECTORY = 'DIRECTORY',
}

export enum EntryType {
  FILE = 'FILE',
  DIRECTORY = 'DIRECTORY',
}

export interface DirectoryDragObject {
  entryType: EntryType;
}

export function isDirectoryDragObject(item: any): item is DirectoryDragObject {
  return typeof item === 'object' && 'entryType' in item;
}
