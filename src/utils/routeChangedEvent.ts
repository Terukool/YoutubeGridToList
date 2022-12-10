export const ROUTE_EVENT_NAME = 'route-changed';

export type RouteChangedEventMessage = {
    type: typeof ROUTE_EVENT_NAME,
    newPathname: string
}