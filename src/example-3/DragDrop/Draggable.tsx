import React from 'react';
import {
  ConnectDragPreview,
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec,
} from 'react-dnd';
import { DragPayload, DRAG_DROP_TYPE, DropResult, ID } from './DragDropTypes';

export interface DragEndPayload {
  draggableId: ID;
  droppableId: ID;
}

interface RenderProps {
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  isDragging: boolean;
}

interface OwnProps {
  children: (props: RenderProps) => JSX.Element;
  draggableId: ID;
  onDragEnd: (payload: DragEndPayload) => void;
}

function collect(
  connect: DragSourceConnector,
  monitor: DragSourceMonitor,
): RenderProps {
  return {
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const dragSourceSpec: DragSourceSpec<OwnProps, DragPayload> = {
  beginDrag({ draggableId }) {
    return {
      draggableId,
    };
  },
  endDrag({ draggableId, onDragEnd }, monitor) {
    const result: DropResult | null = monitor.getDropResult();
    if (result === null) {
      return;
    }

    const { droppableId } = result;

    onDragEnd({ draggableId, droppableId });
  },
};

type Props = OwnProps & RenderProps;

const DraggableWithoutDnd: React.FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  return children(props);
};

export const Draggable = DragSource(DRAG_DROP_TYPE, dragSourceSpec, collect)(
  DraggableWithoutDnd,
);
