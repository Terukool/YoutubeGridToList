import { waitForTheElement } from "wait-for-the-element";

const YOUTUBE_SUBSCRIPTIONS_URL = '/feed/subscriptions';
const YOUTUBE_SUBSCRIPTIONS_LIST_PATH = '/feed/subscriptions?flow=2';
const GRID_VIEW_SELECTOR = '.ytd-grid-video-renderer';
const LIST_VIEW_SELECTOR = '.ytd-video-renderer';

const deflectGridWhenSubscriptionsLoaded = async () => {
    if (!isCurrentPathSubscriptions())
        return;

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
    if (isListViewDisplayed())
        return;

    window.location.replace(YOUTUBE_SUBSCRIPTIONS_LIST_PATH);
};

const isListViewDisplayed = () => {
    const gridViewItem = document.querySelector(LIST_VIEW_SELECTOR);
    return gridViewItem !== null;
}


const onHrefChanged = (action: () => void) => {
    const body = document.querySelector('body');
    
    if (!body) return;

    let oldHref = document.location.href;
    // using MutationObserver to detect angular router changes since that's the method I found works best
    const observer = new MutationObserver(() => {
        const newHref = document.location.href;
        if (oldHref === newHref)
            return;

        action();

        oldHref = newHref;
    });

    observer.observe(body, { attributes: true, attributeFilter: ['href'] });
}

deflectGridWhenSubscriptionsLoaded();
onHrefChanged(deflectGridWhenSubscriptionsLoaded);