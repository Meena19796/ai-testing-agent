import {faker} from '@faker-js/faker';

export function newUser() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dob: '2000-07-19',
        street: faker.location.streetAddress(),
        postcode: '10001',
        houseNumber: '42',
        city: faker.location.city(),
        state: faker.location.state(),
        phone: '789456123569',
        email: faker.internet.email({provider: 'example.com'}).toLowerCase(),
        password: 'Qa@'+faker.string.alphanumeric(10)+'9',
    };

}