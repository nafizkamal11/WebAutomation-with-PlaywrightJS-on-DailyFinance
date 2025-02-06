import {faker} from "@faker-js/faker";

class RegistrationPage {
    constructor(page) {
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.phoneNumber = page.getByRole('textbox', {name: 'Phone Number'});
        this.password = page.getByRole('textbox', {name: 'Password'});
        this.address = page.getByRole('textbox', {name: 'Address'})
        this.gender = page.getByRole('radio')
        this.terms = page.getByRole('checkbox');
        this.btnRegistration = page.getByRole('button', {name: 'Register'});
    }

    async registerUser(emailPrefix) {
        let user = {
            firstName : faker.person.firstName(),
            lastName : faker.person.lastName(),
            email : `${emailPrefix}+${(Math.round(Math.random() * (999 - 100) + 100))}@gmail.com`,
            password : faker.internet.password(),
            phoneNumber : `0123${Math.round(Math.random() * (9999999 - 1000000) + 1000000)}`,
            address : faker.location.city() + "," + faker.location.state() + "," + faker.location.country()
        }

        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.email.fill(user.email);
        await this.password.fill(user.password);
        await this.phoneNumber.fill(user.phoneNumber);
        await this.address.fill(user.address);
        await this.gender.first().check();
        await this.terms.check();
        await this.btnRegistration.click();

        return user;
    }
}

export default RegistrationPage;