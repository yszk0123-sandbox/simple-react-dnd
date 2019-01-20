import React from 'react';
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec,
} from 'react-dnd';
import { DndItemType, EntryType, isDirectoryDragObject } from './Model';

interface PropsFromDnd {
  canDrop: boolean;
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
}

function collect(
  connect: DropTargetConnector,
  monitor: DropTargetMonitor,
): PropsFromDnd {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const directoryTarget: DropTargetSpec<PropsWithoutDnd> = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    return (
      isDirectoryDragObject(item) && item.entryType === EntryType.DIRECTORY
    );
  },
  drop(props, monitor) {
    console.log('drop', props);
    console.log('drop item', monitor.getItem());
    console.log('drop result', monitor.getDropResult());
  },
};

interface PropsWithoutDnd {
  title: string;
}

interface Props extends PropsWithoutDnd, PropsFromDnd {}

const BarWithoutDnd: React.FunctionComponent<Props> = ({
  title,
  canDrop,
  connectDropTarget,
  isOver,
}) => {
  return connectDropTarget(
    <div style={{ opacity: isOver ? 0.5 : 1 }}>
      {title}
      {canDrop ? '!' : ''}
    </div>,
  );
};

export const Bar = DropTarget(DndItemType.ENTRY, directoryTarget, collect)(
  BarWithoutDnd,
);
