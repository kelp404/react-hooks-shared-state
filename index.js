const SharedState = require('./lib/shared-state');

const sharedState = new SharedState();

exports.setState = sharedState.setState;
exports.setSharedState = sharedState.setState;
exports.useState = sharedState.useState;
exports.useSharedState = sharedState.useState;
