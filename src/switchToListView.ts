import { waitForTheElement } from "wait-for-the-element";

const YOUTUBE_SUBSCRIPTIONS_URL = '/feed/subscriptions';
const YOUTUBE_SUBSCRIPTIONS_LIST_PATH = '/feed/subscriptions?flow=2';
const GRID_VIEW_CLASS = 'ytd-grid-renderer';
const SOME_YOUTUBE_VIDEO_CLASS = 'ytd-video-preview';

const deflectGridView = () => {
    if (isCurrentPathSubscriptions()) {
        switchToListViewIfGrid();
    }

    listenToSubscriptionChange();
}

const listenToSubscriptionChange = async () => {
    window.addEventListener('hashchange', () => executeAfterPageLoad(switchToListViewIfGrid));
    
    const subscriptionsRedirects = document.querySelectorAll(`a[href*="${YOUTUBE_SUBSCRIPTIONS_URL}"]`);

    subscriptionsRedirects.forEach((element) => {
        if (!(element instanceof HTMLElement))
            return;

        element.onclick = () => executeAfterPageLoad(switchToListViewIfGrid);
    });

    console.log('set', subscriptionsRedirects);
};

const isCurrentPathSubscriptions = () => {
    const currentUrlPath = getURLPath();
    return currentUrlPath === YOUTUBE_SUBSCRIPTIONS_URL
};

const switchToListViewIfGrid = () => {

    console.log('path matches...');

    if (!isGridViewDisplayed())
        return;

    console.log('replacing...')

    window.location.replace(YOUTUBE_SUBSCRIPTIONS_LIST_PATH);
};

const isGridViewDisplayed = () => {
    const gridViewItem = document.querySelector(`.${GRID_VIEW_CLASS}`);
    console.log(gridViewItem, `.${GRID_VIEW_CLASS}`);
    return gridViewItem !== null;
}

const getURLPath = () => {
    return window.location.pathname;
};

const getHostWithNewPath = (newPath: string) => {
    return `${window.location.host}${newPath}`;
}

const executeAfterPageLoad = async (action: () => void) => {
    await waitForTheElement(SOME_YOUTUBE_VIDEO_CLASS);

    action();
}

executeAfterPageLoad(deflectGridView);