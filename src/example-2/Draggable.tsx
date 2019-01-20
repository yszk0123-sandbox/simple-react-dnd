import React from 'react';
import {
  ConnectDragPreview,
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec,
} from 'react-dnd';
import { DirectoryDragObject, DndItemType, EntryType, ID } from '../Model';

interface RenderProps {
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  isDragging: boolean;
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

const dragSourceSpec: DragSourceSpec<OwnProps, DirectoryDragObject> = {
  beginDrag(props) {
    console.log('beginDrag', props);
    return {
      entryType: props.entryType,
      id: props.draggableId,
    };
  },
  endDrag(a, b) {
    console.log('endDrag', a, b);
  },
};

interface OwnProps {
  children: (props: RenderProps) => JSX.Element;
  entryType: EntryType;
  draggableId: ID;
}

type Props = OwnProps & RenderProps;

const DraggableWithoutDnd: React.FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  return children(props);
};

export const Draggable = DragSource(DndItemType.ENTRY, dragSourceSpec, collect)(
  DraggableWithoutDnd,
);
