const YOUTUBE_SUBSCRIPTIONS_URL = 'www.youtube.com/feed/subscriptions';
const YOUTUBE_SUBSCRIPTIONS_LIST_URL = 'www.youtube.com/feed/subscriptions?flow=2';
const GRID_VIEW_CLASS = 'ytd-grid-renderer';

const switchToListViewWhenGrid = async () => {
    const tab = await chrome.tabs.getCurrent();
    if (!tab || tab.url?.startsWith(YOUTUBE_SUBSCRIPTIONS_URL)) {
        return;
    }

    const gridViewItem = document.getElementsByClassName(GRID_VIEW_CLASS).item;
    const isGridView = gridViewItem !== null;

    if (!isGridView)
        return;

    tab.url = YOUTUBE_SUBSCRIPTIONS_LIST_URL;
};

document.onload = () => switchToListViewWhenGrid();