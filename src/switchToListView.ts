const YOUTUBE_SUBSCRIPTIONS_URL = '/feed/subscriptions';
const YOUTUBE_SUBSCRIPTIONS_LIST_PATH = '/feed/subscriptions?flow=2';
const GRID_VIEW_CLASS = 'ytd-grid-renderer';

const deflectGridView = () => {
    if (isCurrentPathSubscriptions()) {
        switchToListViewIfGrid();
    }

    listenToSubscriptionChange();
}

const listenToSubscriptionChange = async () => {
    const subscriptionsRedirects = document.querySelectorAll(`a[href*="${YOUTUBE_SUBSCRIPTIONS_URL}"]`);

    subscriptionsRedirects.forEach((element) => {
        if (!(element instanceof HTMLElement))
            return;

        element.onclick = () => setTimeout(switchToListViewIfGrid);
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

const executeAfterPageLoad = (action: () => void) => {
    if (document.readyState === "complete") {
        console.log('basa');
        action();
        return;
    }

    document.addEventListener('readystatechange', () => console.log("FUCKY"));
    document.addEventListener('readystatechange', () => action());
}

executeAfterPageLoad(deflectGridView);