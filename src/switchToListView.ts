import { RouteChangedEventMessage , ROUTE_EVENT_NAME } from './utils/routeChangedEvent';
import { waitForTheElement } from "wait-for-the-element";

const YOUTUBE_SUBSCRIPTIONS_URL = '/feed/subscriptions';
const YOUTUBE_SUBSCRIPTIONS_LIST_PATH = '/feed/subscriptions?flow=2';
const SUBSCRIPTIONS_CONTAINER_SELECTOR = 'ytd-browse[role="main"][page-subtype="subscriptions"]';
const GRID_VIEW_SELECTOR = `${SUBSCRIPTIONS_CONTAINER_SELECTOR} .ytd-grid-video-renderer`;
const LIST_VIEW_SELECTOR = `${SUBSCRIPTIONS_CONTAINER_SELECTOR} .ytd-video-renderer`;

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

    return currentUrlPath === YOUTUBE_SUBSCRIPTIONS_URL;
};

const waitForSubscriptionsPageToLoad = (): Promise<unknown> => {
    return Promise.race([waitForTheElement(LIST_VIEW_SELECTOR), waitForTheElement(GRID_VIEW_SELECTOR)]);
};

const assertListView = () => {
    console.log('checking is list view is displayed...')
    if (isListViewDisplayed())
        return;

    console.log('subscriptions is grid! changing...');

    window.location.replace(YOUTUBE_SUBSCRIPTIONS_LIST_PATH);
};

const isListViewDisplayed = () => {
    const gridViewItem = document.querySelector(GRID_VIEW_SELECTOR);
    const listViewItem = document.querySelector(LIST_VIEW_SELECTOR);
    console.log(gridViewItem, listViewItem);
    return gridViewItem === null && listViewItem !== null;
};

const onHrefChanged = (action: () => void) => {
    let oldPathname : string = window.location.pathname;
    chrome.runtime.onMessage.addListener((message: RouteChangedEventMessage) => {
        console.log('got', message)
        if (message.type !== ROUTE_EVENT_NAME)
            return;

        const { newPathname } = message;
        if (oldPathname === newPathname)
            return;

        action();

        oldPathname = newPathname;
    });
};

deflectGridWhenSubscriptionsLoaded();
onHrefChanged(deflectGridWhenSubscriptionsLoaded);