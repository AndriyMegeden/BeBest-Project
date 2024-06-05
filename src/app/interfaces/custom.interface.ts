import { Validators } from "@angular/forms";
import { Observable } from "rxjs";

export interface Menu{
    link?: string;
    text?: string;
    icon?: string;
}

// Auth component settings
export type AuthType = 'register' | 'login' | 'forgot-password-step-1' | 'forgot-password-step-2' | 'forgot-password-step-3';
export interface Field{
    fieldId: string;
    validators: Validators;
    value: any,
}
export interface AuthSettings{
    repeat?: string;
    password?: string;
    password2?: string;
    placeholder?: string;
    placeholder2?: string;
    button?: string;
    forgot?: string;
    remember?: string;
    licence?: string;
    title: string;
    subtitle?: string;
    actionText: string;
    sections: Array<string>;
    fields: Field[];
};

export type WizardType = 'wizard-step-1' | 'wizard-step-2' | 'wizard-step-3' | 'wizard-step-4' | 'wizard-step-5' | 'completed';
export interface WizardSettings{
    title: string;
    icon: string;
    fields: Field[];
    sections: Array<string>;
};

export interface WizardEvent{
    type: WizardType,
    index: number
}

export interface ListLayoutConfig{
    title: string;
    seeAllLink?: string;
}

export type Orientation = 'vertical' | 'horizontal';

export type SystemArticleType = 'who_are_we' | 'support' | 'about_app' | 'contact_us';
