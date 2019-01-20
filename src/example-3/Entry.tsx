import React from 'react';
import { EntryType, ID } from '../Model';
import { DragEndPayload, Draggable, Droppable } from './DragDrop';

interface Props {
  entryType: EntryType;
  title: string;
  id: ID;
  onDragEnd: (srcEntryId: ID, destEntryId: ID) => void;
}

export const Entry: React.FunctionComponent<Props> = ({
  entryType,
  id,
  onDragEnd,
  title,
}) => {
  return (
    <Droppable canDrop={entryType === EntryType.DIRECTORY} droppableId={id}>
      {({ canDrop, connectDropTarget, isOver }) => {
        const handleDragEnd = (payload: DragEndPayload) => {
          onDragEnd(payload.draggableId, payload.droppableId);
        };

        return (
          <Draggable draggableId={id} onDragEnd={handleDragEnd}>
            {({ connectDragPreview, isDragging, connectDragSource }) => {
              return connectDragSource(
                connectDropTarget(
                  <div style={{ display: 'flex', opacity: isOver ? 0.5 : 1 }}>
                    {connectDragPreview(<div>{title}</div>)}
                    {isOver ? (canDrop ? 'ok' : 'no') : null}
                  </div>,
                ),
              );
            }}
          </Draggable>
        );
      }}
    </Droppable>
  );
};
