if (process.env.NODE_ENV === 'production') {
    __webpack_public_path__ = (window.CONFIG.static_path || '/')+(window.ACCOUNT.customize||'common')+'/';
}
