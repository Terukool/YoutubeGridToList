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
const YOUTUBE_SUBSCRIPTIONS_URL = 'www.youtube.com/feed/subscriptions';
const YOUTUBE_SUBSCRIPTIONS_LIST_URL = 'www.youtube.com/feed/subscriptions?flow=2';
const GRID_VIEW_CLASS = 'ytd-grid-renderer';
const switchToListViewWhenGrid = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tab = yield chrome.tabs.getCurrent();
    if (!tab || ((_a = tab.url) === null || _a === void 0 ? void 0 : _a.startsWith(YOUTUBE_SUBSCRIPTIONS_URL))) {
        return;
    }
    const gridViewItem = document.getElementsByClassName(GRID_VIEW_CLASS).item;
    const isGridView = gridViewItem !== null;
    if (!isGridView)
        return;
    tab.url = YOUTUBE_SUBSCRIPTIONS_LIST_URL;
});
document.onload = () => switchToListViewWhenGrid();
