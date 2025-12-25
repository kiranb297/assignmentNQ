import { test } from '@playwright/test';
import { LoginPage } from '@pages';
import { invalidPassword, invalidPasswordErrorMessage, 
         invalidUsername, invalidUsernameErrorMessage, 
         navigationEndPoint, validLoginCredentials } from '@data';

test('Successful Login with Valid Credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage(navigationEndPoint);
  await loginPage.validateLoginPage();
  await loginPage.login(validLoginCredentials.username, validLoginCredentials.password);
  await loginPage.validateSuccessfulLogin();
  await loginPage.logOut();
  await loginPage.validateLoginPage();
});

test('Multiple Successful Logins in Sequence', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage(navigationEndPoint);
  await loginPage.validateLoginPage();
  await loginPage.login(validLoginCredentials.username, validLoginCredentials.password);
  await loginPage.validateSuccessfulLogin();
  await loginPage.logOut();
  await loginPage.validateLoginPage();
  await loginPage.login(validLoginCredentials.username, validLoginCredentials.password);
  await loginPage.validateSuccessfulLogin();
  await loginPage.logOut();
  await loginPage.validateLoginPage();
});

test('Login with Invalid Username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage(navigationEndPoint);
  await loginPage.validateLoginPage();
  await loginPage.login(invalidUsername, validLoginCredentials.password);
  await loginPage.validateLoginError(invalidUsernameErrorMessage);
  await loginPage.validateLoginPage();
});

test('Login with Invalid Password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage(navigationEndPoint);
  await loginPage.validateLoginPage();
  await loginPage.login(validLoginCredentials.username, invalidPassword);
  await loginPage.validateLoginError(invalidPasswordErrorMessage);
  await loginPage.validateLoginPage();
});

test('Login with Empty Username Field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage(navigationEndPoint);
  await loginPage.validateLoginPage();
  await loginPage.login('', validLoginCredentials.password);
  await loginPage.validateLoginError(invalidUsernameErrorMessage);
  await loginPage.validateLoginPage();
});

test('Login with Empty Password Field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage(navigationEndPoint);
  await loginPage.validateLoginPage();
  await loginPage.login(validLoginCredentials.username, '');
  await loginPage.validateLoginError(invalidPasswordErrorMessage);
  await loginPage.validateLoginPage();
});

test('Login with Both Empty Fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage(navigationEndPoint);
  await loginPage.validateLoginPage();
  await loginPage.login('', '');
  await loginPage.validateLoginError(invalidUsernameErrorMessage);
  await loginPage.validateLoginPage();
});