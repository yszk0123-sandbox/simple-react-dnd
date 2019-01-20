import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { EntryType } from '../Model';
import { Entry } from './Entry';

interface Props {}

export const Example: React.FunctionComponent<Props> = () => {
  return (
    <React.Fragment>
      <DragDropContextProvider backend={HTML5Backend}>
        <Entry id="entry-1" title="directory" entryType={EntryType.DIRECTORY} />
        <Entry id="entry-2" title="file" entryType={EntryType.FILE} />
        <Entry id="entry-3" title="directory" entryType={EntryType.DIRECTORY} />
        <Entry id="entry-4" title="directory" entryType={EntryType.DIRECTORY} />
        <Entry id="entry-5" title="file" entryType={EntryType.FILE} />
      </DragDropContextProvider>
    </React.Fragment>
  );
};
