// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  remoteApi: 'http://localhost:3001/files/index.html',
  // socketNotificationApi: 'http://localhost:8000/notification/socket.io',
  socketConfigApi: 'http://localhost:8001/config/socket.io',
  wordpressApi: 'https://content.bebest.petrishin.com/index.php/wp-json/wp/v2',
  googleClientId: '948058061468-8gkb16pg30o7h0q2e9e43n6iikriqh34.apps.googleusercontent.com',
  facebookCLientId: '1282185142663634',
  facebookPermissions: ['email','public_profile'],
  glassfyKey: '7e99d2b7851e4ef7b6c5a1a93b651123',
  languages: {
    available: ['en', 'ua', 'ru'],
    default: 'en'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
