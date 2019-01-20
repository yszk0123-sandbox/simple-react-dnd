export type ID = string;

export type DragDropType = string;

export const DRAG_DROP_TYPE = 'DRAG_DROP';

export interface DragPayload {
  draggableId: ID;
}

export interface DropResult {
  droppableId: ID;
}
