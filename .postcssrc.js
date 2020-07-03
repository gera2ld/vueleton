const { combineConfigSync } = require('@gera2ld/plaid');
const precss = require('@gera2ld/plaid/postcss/precss');

module.exports = combineConfigSync({}, [precss]);
