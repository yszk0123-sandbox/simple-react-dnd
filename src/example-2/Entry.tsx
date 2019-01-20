import React from 'react';
import { EntryType, ID } from '../Model';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

interface Props {
  entryType: EntryType;
  title: string;
  id: ID;
}

export const Entry: React.FunctionComponent<Props> = ({ id, title }) => {
  return (
    <Droppable droppableId={id}>
      {({ canDrop, connectDropTarget, isOver }) => {
        return (
          <Draggable draggableId={id} entryType={EntryType.DIRECTORY}>
            {({ connectDragPreview, isDragging, connectDragSource }) => {
              return connectDragSource(
                connectDropTarget(
                  <div style={{ display: 'flex', opacity: isOver ? 0.5 : 1 }}>
                    {connectDragPreview(<div>{title}</div>)}
                    {canDrop ? '!' : ''}
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
