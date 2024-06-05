import { Validators } from "@angular/forms";
import { AuthSettings, SystemArticleType, WizardSettings, WizardType } from "@interfaces/custom.interface";
import { ChooseCategoryModal, Colors, GoalMotivation, GoalStatuses, GoalTime, WeekDays } from "@interfaces/goal.interface";
import { BehaviorSubject } from "rxjs";


export const loginSetting: AuthSettings = {
    password: 'auth.password',
    button: 'auth.sign_in_button',
    forgot: 'auth.forgot',
    title: 'auth.improve',
    subtitle: 'auth.make',
    placeholder: 'auth.email',
    actionText: 'auth.login',
    sections: ['headIcon', 'social',  'agreement', 'sign_in', 'button'],
    fields: [
        {
            value: '',
            fieldId: 'email',
            validators: [Validators.required, Validators.email, Validators.minLength(3)]
        },
        {
            value: '',
            fieldId: 'password',
            validators: [Validators.required, Validators.minLength(6)]
        }
    ]
};

export const registerSetting: AuthSettings = {
    repeat:'auth.password',
    password: 'auth.password',
    placeholder: 'auth.email',
    placeholder2: 'auth.name',
    button: 'auth.sign_up_button',
    forgot: 'auth.forgot',
    title: 'auth.sign_up_title', 
    subtitle: 'auth.some_text',
    actionText: 'auth.register', 
    sections: ['social', 'agreement', 'licence', 'sign_up', 'button'],
    fields: [
        {
            value: '',
            fieldId: 'firstName',
            validators: [Validators.required, Validators.minLength(3)]
        },
        {
            value: '',
            fieldId: 'email',
            validators: [Validators.required, Validators.email, Validators.minLength(3)]
        },
        {
            value: '',
            fieldId: 'password',
            validators: [Validators.required, Validators.minLength(6)]
        },
        {
            value: '',
            fieldId: 'repeatPassword',
            validators: [Validators.required, Validators.minLength(6)]
        },
        {
            value: false,
            fieldId: 'accept',
            validators: [Validators.requiredTrue]
        }
    ]

};

export const forgotPasswordSettingsStep1: AuthSettings = {
    repeat:'auth.repeat_password',
    password: 'auth.new_password',
    placeholder: 'auth.email',
    button: 'auth.next_button',
    remember: 'auth.remember_password',
    title: 'auth.rеcovery_password',
    subtitle: 'auth.enter',
    actionText: 'auth.confirm',
    sections: ['lockIcon', 'button', 'arrow'],
    fields: [
        {
            value: '',
            fieldId: 'email',
            validators: [Validators.required, Validators.email, Validators.minLength(3), ]
        },
    ]
};

export const forgotPasswordSettingsStep2: AuthSettings = {
    repeat:'auth.repeat_password',
    password: 'auth.new_password',
    button: 'auth.next_button',
    remember: 'auth.remember_password',
    title: 'auth.rеcovery_password',
    subtitle: 'auth.send',
    actionText: 'auth.confirm',
    sections: ['lockIcon', 'button', 'code', 'arrow'],
    fields: [
        {
            value: '',
            fieldId: 'code1',
            validators: [Validators.required, Validators.minLength(1)]
        },
        {
            value: '',
            fieldId: 'code2',
            validators: [Validators.required, Validators.minLength(1)]
        },
        {
            value: '',
            fieldId: 'code3',
            validators: [Validators.required, Validators.minLength(1)]
        },
        {
            value: '',
            fieldId: 'code4',
            validators: [Validators.required, Validators.minLength(1)]
        },
    ]
};

export const forgotPasswordSettingsStep3: AuthSettings = {
    repeat:'auth.repeat_password',
    password: 'auth.new_password',
    placeholder: 'auth.large',
    button: 'auth.send_button',
    remember: 'auth.remember_password',
    title: 'auth.new_password',
    subtitle: 'auth.some_text',
    actionText: 'auth.confirm',
    sections: ['lockIcon', 'button', 'arrow'],
    fields: [
        {
            value: '',
            fieldId: 'password',
            validators: [Validators.required, Validators.minLength(6)]
        },
        {
            value: '',
            fieldId: 'repeatPassword',
            validators: [Validators.required, Validators.minLength(6)]
        }
    ]
};

export const wizardSteps: Array<WizardType> = ['wizard-step-1','wizard-step-2', 'wizard-step-3', 'wizard-step-4', 'wizard-step-5', 'completed'];

export const wizardStep1: WizardSettings = {
    title: "component.user_wizard.phone_number",
    icon: "/assets/icons/general/big-icon.svg",
    fields: [
        {
            value: '',
            fieldId: 'phoneNumber',
            validators: [Validators.required, Validators.minLength(19)]
        }
    ],
    sections: []
}

export const wizardStep2: WizardSettings = {
    title: "component.user_wizard.upload_avatar",
    icon: "/assets/icons/general/galary.svg",
    fields: [
        {
            value: '',
            fieldId: 'avatar',
            validators: [Validators.required]
        }
    ],
    sections: ['avatar'],
}

export const wizardStep3: WizardSettings = {
    title: "component.user_wizard.date_of_birth",
    icon: "/assets/icons/general/confetti-birth-date.svg",
    fields: [
        {
            value: '',
            fieldId: 'dateBirth',
            validators: [Validators.required]
        }
    ],
    sections: []
}

export const wizardStep4: WizardSettings = {
    title: "component.user_wizard.city_of_birth",
    icon: "/assets/icons/general/city-birth.svg",
    fields: [
        {
            value: '',
            fieldId: 'location',
            validators: [Validators.required, Validators.minLength(4)]
        },
    ],
    sections: []
}

export const wizardStep5: WizardSettings = {
    title: "component.user_wizard.social_networks",
    icon: "/assets/icons/general/social-networks.svg",
    fields: [
        {
            value: '',
            fieldId: 'facebook',
            validators: [Validators.minLength(4)]
        },
        {
            value: '',
            fieldId: 'instagram',
            validators: [Validators.minLength(4)]
        },
        {
            value: '',
            fieldId: 'telegram',
            validators: [Validators.minLength(4)]
        },
    ],
    sections: []
}

export const chooseCategoryModal: ChooseCategoryModal[] = [
    {
        id: 'health',
        value: new BehaviorSubject(false),
        color: 'primary'
    },
    {
        id: 'job',
        value: new BehaviorSubject(false),
        color: 'ocean'
    },
    {
        id: 'education',
        value: new BehaviorSubject(false),
        color: 'yellow'
    },
    {
        id: 'social',
        value: new BehaviorSubject(false),
        color: 'orange'
    },
    {
        id: 'money',
        value: new BehaviorSubject(false),
        color: 'blue'
    },
    {
        id: 'your',
        value: new BehaviorSubject(false),
        color: 'yellow'
    }
]


export const colorMap: { [key: string | Colors]: string } = {
    purple: '#9CB1FB',
    blue: '#7FE3F0',
    orange: '#FCB96D',
    yellow: '#E9D628',
    red: '#F2795A',
    primary: '#2079FF',
    ocean: '#2A8AA3',
    pink: '#FF88E5',
    violet: '#567BFF',
    green: '#65BD6D'
};

export const categories: Array<string> = ['health', 'job', 'education', 'social', 'money', 'your'];
export const goalMotivation: Array<GoalMotivation> = ['i_want', 'i_accept_austerity'];
export const goalStatuses: Array<GoalStatuses> = ['active', 'archive'];
export const goalTime: Array<GoalTime> = ['week', 'month'];
export const weekDays: Array<WeekDays> = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const colors: Array<Colors> =['purple', 'blue', 'orange', 'yellow', 'red', 'primary', 'ocean', 'pink', 'violet', 'green'];
export const languages: Array<string> = ['en', 'ua', 'ru'];

export const rateAndroidAppLink: string = 'https://play.google.com/store/games?hl=ru&gl=US';
export const rateIosAppLink: string = 'https://apps.apple.com/ru/developer/apple/id284417353?mt=12';
export const privatePoliceContentId: number = 122;
export const termOfUseContentId: number = 125;

export const excludeСategories = [7];

export const systemArticle: { key: SystemArticleType, categoryId: number }[] = [
    {
        key: 'who_are_we',
        categoryId: 110,
    },
    {
        key: 'about_app',
        categoryId: 116,
    },
    {
        key: 'contact_us',
        categoryId: 119
    }
]

