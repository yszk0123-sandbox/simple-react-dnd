import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { EntryType } from '../Model';
import { Breadcrumb } from './Breadcrumb';
import { Entry } from './Entry';

interface Props {}

export const Example: React.FunctionComponent<Props> = () => {
  return (
    <React.Fragment>
      <DragDropContextProvider backend={HTML5Backend}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumb id="entry-1" title="1" entryType={EntryType.DIRECTORY} />
          <div style={{ padding: '0 4px' }}>></div>
          <Breadcrumb id="entry-2" title="2" entryType={EntryType.DIRECTORY} />
        </div>
        <Entry id="entry-1" title="directory" entryType={EntryType.DIRECTORY} />
        <Entry id="entry-2" title="file" entryType={EntryType.FILE} />
        <Entry id="entry-3" title="directory" entryType={EntryType.DIRECTORY} />
        <Entry id="entry-4" title="directory" entryType={EntryType.DIRECTORY} />
        <Entry id="entry-5" title="file" entryType={EntryType.FILE} />
      </DragDropContextProvider>
    </React.Fragment>
  );
};
