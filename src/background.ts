import { RouteChangedEventMessage, ROUTE_EVENT_NAME } from "./utils/routeChangedEvent";

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    const newPathname = new URL(details.url).pathname;

    chrome.tabs.sendMessage<RouteChangedEventMessage>(details.tabId, {
        type: ROUTE_EVENT_NAME,
        newPathname
    });
}, {
    url: [{
        hostEquals: 'www.youtube.com'
    }]
});