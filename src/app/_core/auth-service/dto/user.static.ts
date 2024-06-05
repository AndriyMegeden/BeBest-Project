import { CreateUserRequest, LoginUserRequest, VerificationAuthFieldsRequest } from "./user.dto";

export const createUserRequest: CreateUserRequest = {
    authFieldType: 'email',
    authFieldValue: 'example@gmail.com',
    password: '123123',
    authInfo: {
        firstName: 'UserTest'
    }
}

export const loginUserRequest: LoginUserRequest = {
    authFieldType: 'email',
    authFieldValue: 'example@gmail.com',
    password: '123123'
}

export const verificationAuthFieldsRequest: VerificationAuthFieldsRequest = {
    authFieldType: 'email',
    authFieldValue: 'example@gmail.com',
}