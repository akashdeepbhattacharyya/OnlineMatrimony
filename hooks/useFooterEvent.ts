// hooks/useFooterEvent.ts
import { useEffect } from 'react';
import { EventEmitter } from 'events';

const footerEmitter = new EventEmitter();

export const useFooterEvent = (event: string, callback: () => void) => {
  useEffect(() => {
    footerEmitter.addListener(event, callback);
    return () => {
      footerEmitter.removeListener(event, callback);
    };
  }, [event, callback]);
};

export const emitFooterEvent = (event: 'ACCEPT_MATCH' | 'REJECT_MATCH') => {
  footerEmitter.emit(event);
};
