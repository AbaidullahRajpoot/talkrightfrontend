export function convertCalendarEvents(events) {

  return events.map(event => ({

    id: event.id,
    url: event.htmlLink,
    title: event.organizer.displayName,
    start: new Date(event.start.dateTime),
    end: new Date(event.end.dateTime),
    allDay: false,
    extendedProps: {
      calendar: event.organizer.displayName
    }

  }));
}
