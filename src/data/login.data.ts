import { LoginCredentials } from "@types";
import { randomString } from "@helper";

export const navigationEndPoint: string = '/practice-test-login';

export const validLoginCredentials : LoginCredentials =  {
    username: 'student',
    password: 'Password123',
}
export const invalidUsername = randomString('alphabets', 6);
export const invalidPassword = randomString('alphanumeric', 8);
export const invalidUsernameErrorMessage: string = 'Your username is invalid!';
export const invalidPasswordErrorMessage: string = 'Your password is invalid!';
