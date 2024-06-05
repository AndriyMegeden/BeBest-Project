import { LangId } from "@core/auth-service/dto/user.dto";

export interface AuthInfo{
  email?: string;
  avatar?: string;
  firstName?: string;
  phoneNumber?: string;
  dateBirth?: Date;
  location?: string;
  facebook?: string;
  instagram?: string;
  telegram?: string;
  notificationStatus?: boolean;
  langId?: LangId;
}

