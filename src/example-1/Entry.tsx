import React from 'react';
import {
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec,
} from 'react-dnd';
import { DirectoryDragObject, DndItemType, EntryType, ID } from '../Model';

interface PropsFromDragSource {
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  isDragging: boolean;
}

function collectPropsFromDragSource(
  connect: DragSourceConnector,
  monitor: DragSourceMonitor,
): PropsFromDragSource {
  return {
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

interface PropsFromDropTarget {
  canDrop: boolean;
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
}

function collectPropsFromDropTarget(
  connect: DropTargetConnector,
  monitor: DropTargetMonitor,
): PropsFromDropTarget {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const dragSourceSpec: DragSourceSpec<PropsFromParent, DirectoryDragObject> = {
  beginDrag(props) {
    console.log('beginDrag', props);
    return {
      entryType: props.entryType,
      id: props.id,
    };
  },
  endDrag(a, b) {
    console.log('endDrag', a, b);
  },
};

const dropTargetSpec: DropTargetSpec<PropsFromParent> = {
  canDrop(props, monitor) {
    return monitor.isOver();
  },
  drop(props, monitor) {
    console.log('drop props', props);
    console.log('drop item', monitor.getItem());
    console.log('drop result', monitor.getDropResult());
    return;
  },
};

interface PropsFromParent {
  entryType: EntryType;
  title: string;
  id: ID;
}

interface Props
  extends PropsFromParent,
    PropsFromDropTarget,
    PropsFromDragSource {}

const EntryWithoutDnd: React.FunctionComponent<Props> = ({
  title,
  canDrop,
  connectDropTarget,
  connectDragSource,
  connectDragPreview,
  isOver,
}) => {
  return connectDragSource(
    connectDropTarget(
      <div style={{ display: 'flex', opacity: isOver ? 0.5 : 1 }}>
        {connectDragPreview(<div>{title}</div>)}
        {canDrop ? '!' : ''}
      </div>,
    ),
  );
};

export const Entry = DragSource(
  DndItemType.ENTRY,
  dragSourceSpec,
  collectPropsFromDragSource,
)(
  DropTarget(DndItemType.ENTRY, dropTargetSpec, collectPropsFromDropTarget)(
    EntryWithoutDnd,
  ),
);
