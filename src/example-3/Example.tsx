import React from 'react';
import { EntryType } from '../Model';
import { Breadcrumb } from './Breadcrumb';
import { DragDropContextProvider } from './DragDrop';
import { Entry } from './Entry';

interface Item {
  id: string;
  entryType: EntryType;
}

function getTitleForItem(item: Item): string {
  const type = item.entryType === EntryType.DIRECTORY ? 'D' : 'F';

  return `${item.id} (${type})`;
}

const items: Item[] = [
  { id: 'entry-1', entryType: EntryType.DIRECTORY },
  { id: 'entry-2', entryType: EntryType.FILE },
  { id: 'entry-3', entryType: EntryType.DIRECTORY },
  { id: 'entry-4', entryType: EntryType.DIRECTORY },
  { id: 'entry-5', entryType: EntryType.FILE },
];
const breadcrumbItems: Item[] = [items[0], items[3]];

interface Props {}

export const Example: React.FunctionComponent<Props> = () => {
  const onDragEnd = (srcEntryId: string, destEntryId: string) => {
    console.log({ srcEntryId, destEntryId });
  };

  return (
    <React.Fragment>
      <DragDropContextProvider>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {breadcrumbItems.map((item, index) => {
            return (
              <>
                {index > 0 ? <div style={{ padding: '0 4px' }}>></div> : null}
                <Breadcrumb
                  key={item.id}
                  id={item.id}
                  title={getTitleForItem(item)}
                  entryType={item.entryType}
                />
              </>
            );
          })}
        </div>
        {items.map(item => {
          return (
            <Entry
              key={item.id}
              id={item.id}
              title={getTitleForItem(item)}
              entryType={item.entryType}
              onDragEnd={onDragEnd}
            />
          );
        })}
      </DragDropContextProvider>
    </React.Fragment>
  );
};
