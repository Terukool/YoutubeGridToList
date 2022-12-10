import { RouteChangedEvent, ROUTE_EVENT_NAME } from './utils/routeChangedEvent';
import { waitForTheElement } from "wait-for-the-element";

const YOUTUBE_SUBSCRIPTIONS_URL = '/feed/subscriptions';
const YOUTUBE_SUBSCRIPTIONS_LIST_PATH = '/feed/subscriptions?flow=2';
const GRID_VIEW_SELECTOR = '.ytd-grid-video-renderer';
const LIST_VIEW_SELECTOR = '.ytd-video-renderer';

const deflectGridWhenSubscriptionsLoaded = async () => {
    console.log('checking if current page is subscriptions...')
    if (!isCurrentPathSubscriptions())
        return;

    console.log('Current page is Subscriptions');

    await waitForSubscriptionsPageToLoad();

    assertListView();
};

const isCurrentPathSubscriptions = () => {
    const currentUrlPath = window.location.pathname;
    return currentUrlPath === YOUTUBE_SUBSCRIPTIONS_URL
};

const waitForSubscriptionsPageToLoad = (): Promise<unknown> => {
    return Promise.race([waitForTheElement(LIST_VIEW_SELECTOR), waitForTheElement(GRID_VIEW_SELECTOR)]);
}

const assertListView = () => {
    console.log('checking is list view is displayed...')
    if (isListViewDisplayed())
        return;

    console.log('subscriptions is grid! changing...');

    window.location.replace(YOUTUBE_SUBSCRIPTIONS_LIST_PATH);
};

const isListViewDisplayed = () => {
    const gridViewItem = document.querySelector(LIST_VIEW_SELECTOR);
    console.log(gridViewItem);
    return gridViewItem !== null;
}


const onHrefChanged = (action: () => void) => {
    const body = document.querySelector('body');

    if (!body) return;

    let oldHref = document.location.href;
    chrome.runtime.onMessage.addListener((message: RouteChangedEvent) => {
        console.log('got', message)
        if (message.type !== ROUTE_EVENT_NAME)
            return;

        const newHref = message.newPathname;
        if (oldHref === newHref)
            return;

        action();

        oldHref = newHref;
    });
}

deflectGridWhenSubscriptionsLoaded();
onHrefChanged(deflectGridWhenSubscriptionsLoaded);