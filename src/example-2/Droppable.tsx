import React from 'react';
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec,
} from 'react-dnd';
import { DndItemType, ID } from '../Model';

interface RenderProps {
  canDrop: boolean;
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
}

interface OwnProps {
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
  canDrop(props, monitor) {
    return monitor.isOver();
  },
  drop(props, monitor) {
    console.log('drop props', props);
    console.log('drop item', monitor.getItem());
    console.log('drop result', monitor.getDropResult());

    return {
      droppableId: props.droppableId,
    };
  },
};

const DroppableWithoutDnd: React.FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  return children(props);
};

export const Droppable = DropTarget(DndItemType.ENTRY, dropTargetSpec, collect)(
  DroppableWithoutDnd,
);
