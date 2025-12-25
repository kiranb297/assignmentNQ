import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly pageLogo: Locator;
  readonly pageHeading: Locator;
  readonly homeLink: Locator;
  readonly practiceLink: Locator;
  readonly coursesLink: Locator;
  readonly blogLink: Locator;
  readonly contactLink: Locator;
  readonly loggedInSuccessfully: Locator;
  readonly logoutButton: Locator;
  readonly loginError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.pageLogo = page.getByRole('link', { name: 'Practice Test Automation', exact: true })
    this.pageHeading = page.getByRole('heading', { name: 'Test login' });
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.practiceLink = page.getByRole('link', { name: 'Practice', exact: true });
    this.coursesLink = page.getByRole('link', { name: 'Courses' });
    this.blogLink = page.getByRole('link', { name: 'Blog' });
    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.loggedInSuccessfully = page.getByRole('heading', { name: 'Logged In Successfully' })
    this.logoutButton = page.getByRole('link', { name: 'Log out' })
    this.loginError = page.locator('#error');
  }

  async navigateToLoginPage(endPoint: string) {
    await this.page.goto(endPoint);
  }

  async validateLoginPage() {
    await expect(this.page).toHaveURL(/practice-test-login/);
    await expect(this.pageLogo).toBeVisible();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.pageHeading).toContainText('Test login');
    await expect(this.homeLink).toBeVisible();
    await expect(this.practiceLink).toBeVisible();
    await expect(this.coursesLink).toBeVisible();
    await expect(this.blogLink).toBeVisible();
    await expect(this.contactLink).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async validateSuccessfulLogin() {
    await expect(this.page).toHaveURL(/logged-in-successfully/);
    await expect(this.loggedInSuccessfully).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
  }

  async logOut() {
    await this.logoutButton.click();
  }

  async validateLoginError(errorMessage: string) {
    await expect(this.loginError).toBeVisible();
    await expect(this.loginError).toHaveText(errorMessage);
  }
}