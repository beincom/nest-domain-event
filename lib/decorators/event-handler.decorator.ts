import { generateUUID } from '@beincom/common';
import { IDomainEvent } from '@beincom/domain';
import { EVENTS_METADATA, EVENTS_HANDLER_METADATA } from '../constants';

export const EventsHandler = (
  ...events: (new (...args: any[]) => IDomainEvent<any>)[]
): ClassDecorator => {
  return (target: object) => {
    events.forEach((event) => {
      if (!Reflect.hasOwnMetadata(EVENTS_METADATA, event)) {
        Reflect.defineMetadata(EVENTS_METADATA, { eventId: generateUUID() }, event);
      }
    });

    Reflect.defineMetadata(EVENTS_HANDLER_METADATA, events, target);
  };
};
