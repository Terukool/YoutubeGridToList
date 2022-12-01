"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const YOUTUBE_SUBSCRIPTIONS_URL = '/feed/subscriptions';
const YOUTUBE_SUBSCRIPTIONS_LIST_PATH = '/feed/subscriptions?flow=2';
const GRID_VIEW_CLASS = 'ytd-grid-renderer';
const deflectGridView = () => {
    if (isCurrentPathSubscriptions()) {
        switchToListViewIfGrid();
    }
    listenToSubscriptionChange();
};
const listenToSubscriptionChange = () => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptionsRedirects = document.querySelectorAll(`a[href*="${YOUTUBE_SUBSCRIPTIONS_URL}"]`);
    subscriptionsRedirects.forEach((element) => {
        if (!(element instanceof HTMLElement))
            return;
        element.onclick = () => setTimeout(switchToListViewIfGrid);
    });
    console.log('set', subscriptionsRedirects);
});
const isCurrentPathSubscriptions = () => {
    const currentUrlPath = getURLPath();
    return currentUrlPath === YOUTUBE_SUBSCRIPTIONS_URL;
};
const switchToListViewIfGrid = () => {
    console.log('path matches...');
    if (!isGridViewDisplayed())
        return;
    console.log('replacing...');
    window.location.replace(YOUTUBE_SUBSCRIPTIONS_LIST_PATH);
};
const isGridViewDisplayed = () => {
    const gridViewItem = document.querySelector(`.${GRID_VIEW_CLASS}`);
    console.log(gridViewItem, `.${GRID_VIEW_CLASS}`);
    return gridViewItem !== null;
};
const getURLPath = () => {
    return window.location.pathname;
};
const getHostWithNewPath = (newPath) => {
    return `${window.location.host}${newPath}`;
};
const executeAfterPageLoad = (action) => {
    if (document.readyState === "complete") {
        console.log('basa');
        action();
        return;
    }
    document.addEventListener('readystatechange', () => console.log("FUCKY"));
    document.addEventListener('readystatechange', () => action());
};
executeAfterPageLoad(deflectGridView);
