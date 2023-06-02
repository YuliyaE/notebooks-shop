const config = require('../config.json');

class LoginPage {

  constructor(page) {
    this.page = page;
    this.usernameInput = this.page.locator('input#loginform-username');
    this.passwordinput = this.page.locator('input#loginform-password');
    this.loginButton = this.page.locator('[name=login-button]');
  }

  async goto() {
    await this.page.goto(config.LOGIN_URL);
  }

  async login(user) {
    await this.usernameInput.type(user.username);
    await this.passwordinput.type(user.password);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;