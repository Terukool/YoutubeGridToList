export const ROUTE_EVENT_NAME = 'route-changed';

export type RouteChangedEvent = {
    type: typeof ROUTE_EVENT_NAME,
    newPathname: string
}