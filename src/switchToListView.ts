import { waitForTheElement } from "wait-for-the-element";

const YOUTUBE_SUBSCRIPTIONS_URL = '/feed/subscriptions';
const YOUTUBE_SUBSCRIPTIONS_LIST_PATH = '/feed/subscriptions?flow=2';
const GRID_VIEW_CLASS = 'ytd-grid-renderer';
const LIST_VIEW_CLASS = 'ytd-shelf-renderer';

const deflectGridWhenSubscriptionsLoaded = async () => {
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
    return Promise.race([waitForTheElement(LIST_VIEW_CLASS), waitForTheElement(GRID_VIEW_CLASS)]);
}

const assertListView = () => {
    if (!isGridViewDisplayed())
        return;
    
    console.log('subscriptions is list! changing...');

    window.location.replace(YOUTUBE_SUBSCRIPTIONS_LIST_PATH);
};

const isGridViewDisplayed = () => {
    const gridViewItem = document.querySelector(`.${GRID_VIEW_CLASS}`);
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

    observer.observe(body, { childList: true, subtree: true, attributes: true });
}

deflectGridWhenSubscriptionsLoaded();
onHrefChanged(deflectGridWhenSubscriptionsLoaded);