import * as notifications from 'expo-notifications'

notifications.setNotificationHandler({
  handleNotification: async () => ({
  shouldShowAlert: true,
  shouldPlaySound: true,
  shouldSetBadge: true,

  }),
});