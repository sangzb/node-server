let constants = require('../constant');

module.exports = function(constant) {
  if (!constants.hasOwnProperty(constant))
    console.error(`CONSTANT: '${constant}' is not exists!`);
  return constants[constant];
};
