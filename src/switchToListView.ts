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

    switchToListViewIfGrid();
    cleanup();
};

const isCurrentPathSubscriptions = () => {
    const currentUrlPath = getURLPath();
    return currentUrlPath === YOUTUBE_SUBSCRIPTIONS_URL
};

const getURLPath = () => {
    return window.location.pathname;
};


const waitForSubscriptionsPageToLoad = () : Promise<unknown> => {
    return Promise.race([waitForTheElement(LIST_VIEW_CLASS), waitForTheElement(GRID_VIEW_CLASS)]);
}

const switchToListViewIfGrid = () => {
    if (!isGridViewDisplayed())
        return;

    window.location.replace(YOUTUBE_SUBSCRIPTIONS_LIST_PATH);
};

const isGridViewDisplayed = () => {
    const gridViewItem = document.querySelector(`.${GRID_VIEW_CLASS}`);
    console.log(gridViewItem, `.${GRID_VIEW_CLASS}`);
    return gridViewItem !== null;
}


const onHrefChanged = (filterBy: (href: string) => boolean, action: () => void) => {
    let oldHref = document.location.href;
    const observer = new MutationObserver(() => {
        const newHref = document.location.href;
        if (oldHref === newHref)
            return;

        if (filterBy(newHref)) {
            action();
        }
        oldHref = newHref;
    });
    const body = document.querySelector('body');
    if (!body) return;

    observer.observe(body, { childList: true, subtree: true });

    cleanupAfter.push(() => observer.disconnect());
}

const cleanup = () => {
    cleanupAfter.forEach((cleanup) => cleanup());
}

deflectGridWhenSubscriptionsLoaded();
onHrefChanged((href) => href.includes(YOUTUBE_SUBSCRIPTIONS_URL), () => deflectGridWhenSubscriptionsLoaded());