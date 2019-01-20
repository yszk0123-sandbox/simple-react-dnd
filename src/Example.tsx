import React, { useEffect } from 'react';
import {
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget,
  DragDropContextProvider,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec,
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export enum DndItemType {
  DIRECTORY = 'DIRECTORY',
}

enum EntryType {
  FILE = 'FILE',
  DIRECTORY = 'DIRECTORY',
}

interface FooPropsFromDnd {
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  isDragging: boolean;
}
function collectFoo(
  connect: DragSourceConnector,
  monitor: DragSourceMonitor,
): FooPropsFromDnd {
  return {
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

interface DirectoryDragObject {
  entryType: EntryType;
}
const directorySource: DragSourceSpec<
  FooPropsWithoutDnd,
  DirectoryDragObject
> = {
  beginDrag(props) {
    console.log('beginDrag', props);
    return {
      key: 'hoge',
      entryType: props.entryType,
    };
  },
};
interface FooPropsWithoutDnd {
  entryType: EntryType;
  title: string;
}
interface FooProps extends FooPropsWithoutDnd, FooPropsFromDnd {}
const FooWithoutDnd: React.FunctionComponent<FooProps> = ({
  title,
  connectDragPreview,
  connectDragSource,
  isDragging,
}) => {
  useEffect(() => {
    console.log('effect');
    connectDragPreview(<div>==={title}===</div>);
  }, []);

  return connectDragSource(
    <div style={{ opacity: isDragging ? 0.5 : 1 }}>{title}</div>,
  );
};
const Foo = DragSource(DndItemType.DIRECTORY, directorySource, collectFoo)(
  FooWithoutDnd,
);

interface BarPropsFromDnd {
  canDrop: boolean;
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
}
function collectBar(
  connect: DropTargetConnector,
  monitor: DropTargetMonitor,
): BarPropsFromDnd {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

function isDirectoryDragObject(item: any): item is DirectoryDragObject {
  return typeof item === 'object' && 'entryType' in item;
}

const directoryTarget: DropTargetSpec<BarPropsWithoutDnd> = {
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
interface BarPropsWithoutDnd {
  title: string;
}
interface BarProps extends BarPropsWithoutDnd, BarPropsFromDnd {}
const BarWithoutDnd: React.FunctionComponent<BarProps> = ({
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
const Bar = DropTarget(DndItemType.DIRECTORY, directoryTarget, collectBar)(
  BarWithoutDnd,
);

interface ExampleProps {}
export const Example: React.FunctionComponent<ExampleProps> = () => {
  return (
    <React.Fragment>
      <DragDropContextProvider backend={HTML5Backend}>
        <Foo title="directory" entryType={EntryType.DIRECTORY} />
        <Foo title="file" entryType={EntryType.FILE} />
        <Bar title="bar" />
      </DragDropContextProvider>
    </React.Fragment>
  );
};
