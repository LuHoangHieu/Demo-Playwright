exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.username_txt = page.getByPlaceholder('Username');
        this.password_txt = page.getByPlaceholder('Password');
        this.login_btn = page.locator('#login-button');
    };

    async gotoLogin() {
        await this.page.goto('/');
    };

    async loginUnsuccessful(username, password) {
        await this.username_txt.fill(username);
        await this.password_txt.fill(password);
        await this.login_btn.click();
    };

    async loginSuccessful(username, password) {
        await this.username_txt.clear();
        await this.username_txt.fill(username);
        await this.password_txt.clear();
        await this.password_txt.fill(password);
        await this.login_btn.click();
    };
};
