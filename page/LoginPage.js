class LoginPage {
    constructor(page) {
        this.inpEmail = page.locator("#email");
        this.inpPassword = page.locator("#password");
        this.btnLogin = page.locator("button[type='submit']");
    }

    async loginForm(email, password) {
        await this.inpEmail.fill(email);
        await this.inpPassword.fill(password);
        await this.btnLogin.click();
    }
}

export default LoginPage;