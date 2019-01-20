import React from 'react';
import { EntryType, ID } from '../Model';
import { Droppable } from './DragDrop';

interface Props {
  entryType: EntryType;
  title: string;
  id: ID;
}

export const Breadcrumb: React.FunctionComponent<Props> = ({ id, title }) => {
  return (
    <Droppable canDrop={true} droppableId={id}>
      {({ canDrop, connectDropTarget, isOver }) => {
        return connectDropTarget(
          <div style={{ display: 'flex', opacity: isOver ? 0.5 : 1 }}>
            <div>{title}</div>
            {canDrop ? '!' : ''}
          </div>,
        );
      }}
    </Droppable>
  );
};
