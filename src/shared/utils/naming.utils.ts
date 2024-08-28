export const getFirstAndLastName = (name) => {
    // Split the name by spaces
    const names = name.split(' ');

    // Handle case where name is a single part
    const firstName = names[0] || '';
    const lastName = names.length > 1 ? names.slice(1).join(' ') : '';

    return { firstName, lastName };
};