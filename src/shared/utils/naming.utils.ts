export const getFirstAndLastName = (name) => {
  // Split the name by spaces
  const names = name.split(' ');

  // Handle case where name is a single part
  const firstName = names[0] || '';
  const lastName = names.length > 1 ? names.slice(1).join(' ') : '';

  return { firstName, lastName };
};

export const getFullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
};

export const capitalizeFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
