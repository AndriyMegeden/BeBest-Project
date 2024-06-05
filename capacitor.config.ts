import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'bebest.petrishin.com',
  appName: 'BeBest',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
     SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      // launchFadeOutDuration: 3000,
      // backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      // androidScaleType: "CENTER_CROP",
      showSpinner: false,
      // androidSpinnerStyle: "large",
      // iosSpinnerStyle: "small",
      // spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      // layoutName: "launch_screen",
      // useDialog: true,
    },
    GoogleAuth: {
      scopes: ["profile", "email"],
      clientId: '644383298427-p1vgduetn1m1g3au9uea5qqj7ns2bf53.apps.googleusercontent.com',
      serverClientId: '644383298427-p1vgduetn1m1g3au9uea5qqj7ns2bf53.apps.googleusercontent.com',
      androidClientId: '644383298427-p1vgduetn1m1g3au9uea5qqj7ns2bf53.apps.googleusercontent.com',
      iosClientId: '644383298427-6u0mjajp23bk2uu779h3iom31h4ksmru.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    },
    FacebookLogin: {},
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;
