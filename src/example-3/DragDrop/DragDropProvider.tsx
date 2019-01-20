import React from 'react';
import { DragDropContextProvider as OrignalDragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

interface Props {}

export const DragDropContextProvider: React.FunctionComponent<Props> = ({
  children,
}) => {
  return (
    <OrignalDragDropContextProvider backend={HTML5Backend}>
      {children}
    </OrignalDragDropContextProvider>
  );
};
