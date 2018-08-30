global.fetch = require('jest-fetch-mock')
window.confirm = (message) => { return true };
