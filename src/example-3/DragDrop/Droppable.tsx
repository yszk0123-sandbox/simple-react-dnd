import React from 'react';
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec,
} from 'react-dnd';
import { ID } from '../../Model';
import { DRAG_DROP_TYPE, DropResult } from './DragDropTypes';

interface RenderProps {
  canDrop: boolean;
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
}

interface OwnProps {
  canDrop: boolean;
  children: (props: RenderProps) => JSX.Element;
  droppableId: ID;
}

type Props = RenderProps & RenderProps & OwnProps;

function collect(
  connect: DropTargetConnector,
  monitor: DropTargetMonitor,
): RenderProps {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const dropTargetSpec: DropTargetSpec<OwnProps> = {
  canDrop({ canDrop }, monitor) {
    return canDrop && monitor.isOver();
  },
  drop({ droppableId }): DropResult {
    return {
      droppableId,
    };
  },
};

const DroppableWithoutDnd: React.FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  return children(props);
};

export const Droppable = DropTarget(DRAG_DROP_TYPE, dropTargetSpec, collect)(
  DroppableWithoutDnd,
);
