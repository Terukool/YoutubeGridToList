import { waitForTheElement } from "wait-for-the-element";

const YOUTUBE_SUBSCRIPTIONS_URL = '/feed/subscriptions';
const YOUTUBE_SUBSCRIPTIONS_LIST_PATH = '/feed/subscriptions?flow=2';
const GRID_VIEW_CLASS = 'ytd-grid-renderer';
const LIST_VIEW_CLASS = 'ytd-shelf-renderer';

let cleanupAfter: (() => void)[] = [];

const deflectGridWhenSubscriptionsLoaded = async () => {
    if (!isCurrentPathSubscriptions())
        return;

    await waitForSubscriptionsPageToLoad();

    assertListView();
    cleanup();
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
    const observer = new MutationObserver(() => {
        const newHref = document.location.href;
        if (oldHref === newHref)
            return;

        action();

        oldHref = newHref;
    });

    observer.observe(body, { childList: true, subtree: true });

    cleanupAfter.push(() => observer.disconnect());
}

const cleanup = () => {
    cleanupAfter.forEach((cleanup) => cleanup());
    console.log('disposed');
}

deflectGridWhenSubscriptionsLoaded();
onHrefChanged(deflectGridWhenSubscriptionsLoaded);