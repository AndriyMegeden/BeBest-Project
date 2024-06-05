// import { Injectable } from "@angular/core";
// import { LocalNotifications } from "@capacitor/local-notifications";

// @Injectable({
//     providedIn: 'root'
// })
// export class LocalNotificationService {

//     async sendPush(title: string, body: string) {
//       try {
//         const permission = await LocalNotifications.checkPermissions();
//         if (permission.display === 'granted') {
//             LocalNotifications.schedule({
//                 notifications: [
//                 {
//                     title: title,
//                     body: body,
//                     id: Math.floor(Math.random() * 6000000),
//                 }
//                 ]
//             });
//         } else {
//           console.log('Permission for notifications not granted.');
//         }
//       } catch (error) {
//         console.error('Error scheduling notifications:', error);
//       }
//     }

//     async foregroundLocalNotification(notification: any) {
//       LocalNotifications.schedule({
//         notifications: [
//           {
//             id: Math.floor(Math.random() * 6000000),
//             title: notification.title,
//             body: notification.body,
//             schedule: { at: new Date(Date.now() + 1000 * 1) },
//             extra: notification.data,
//           },
//         ],
//       });
//   }
    
// }
  