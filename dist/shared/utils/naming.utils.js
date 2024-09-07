"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullName = exports.getFirstAndLastName = void 0;
const getFirstAndLastName = (name) => {
    const names = name.split(' ');
    const firstName = names[0] || '';
    const lastName = names.length > 1 ? names.slice(1).join(' ') : '';
    return { firstName, lastName };
};
exports.getFirstAndLastName = getFirstAndLastName;
const getFullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
};
exports.getFullName = getFullName;
//# sourceMappingURL=naming.utils.js.map