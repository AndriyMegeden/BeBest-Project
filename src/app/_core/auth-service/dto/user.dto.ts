export type VerifyType = 'email' | 'phoneNumber' | 'nickname' | 'socialId';
export type SocialType = 'google' | 'facebook';
export type LangId = 'ua' | 'ru' | 'en';



export class CreateUserAuthInfoRequest {
  readonly firstName?: string;
  readonly email?: string;
}

export class UpdateUserAuthInfoRequest{
  readonly firstName?: string;
  readonly phoneNumber?: string;
  readonly dateBirth?: Date;
  readonly location?: string;
  readonly facebook?: string;
  readonly instagram?: string;
  readonly telegram?: string;
  readonly fcmToken?: string;
  readonly notificationStatus?: boolean;
  readonly langId?: LangId;
  readonly auth?: boolean;
}

export class CreateUserRequest {
  readonly authFieldType: VerifyType;
  readonly authFieldValue: string;
  readonly password: string;
  readonly authInfo: CreateUserAuthInfoRequest;
}

export class UpdateUserRequest {
  readonly authInfo: UpdateUserAuthInfoRequest;
}

export class LoginUserRequest {
  readonly authFieldType: VerifyType;
  readonly authFieldValue: string;
  readonly password: string;
}

export class LoginSocialUserRequest {
  readonly authSocialType: SocialType;
  readonly authFieldType: VerifyType;
  readonly authFieldValue: string;
  readonly authInfo?: CreateUserAuthInfoRequest;
}
  
export class VerificationAuthFieldsRequest {
  readonly authFieldType: VerifyType;
  readonly authFieldValue: string;
}

export class GenerateRefreshPasswordCodeRequest {
  readonly authFieldType: VerifyType;
  readonly authFieldValue: string;
  readonly langId: LangId;
}

export class CheckRefreshPasswordCodeRequest {
  readonly authFieldType: VerifyType;
  readonly authFieldValue: string;
  readonly resetId: string;
  readonly resetSecret: string;
}

export class RefreshPasswordRequest {
  readonly authFieldType: VerifyType;
  readonly authFieldValue: string;
  readonly resetId: string;
  readonly resetSecret: string;
  readonly password: string;
}