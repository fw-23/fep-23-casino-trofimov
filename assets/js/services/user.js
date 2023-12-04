function generateUsername(firstName, lastName) {
    return lastName.toLowerCase() + firstName.toLowerCase().substring(0, 3);
}

export {
    generateUsername,
}