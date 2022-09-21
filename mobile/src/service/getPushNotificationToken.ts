import * as notifications from "expo-notifications";

export async function getPushNotificationToken () {
  const {granted} = await notifications.getPermissionsAsync();

  if(!granted){
    await notifications.requestPermissionsAsync();
  }
  if(granted){
    const pushToken = await notifications.getExpoPushTokenAsync();
    
    console.log('NOTIFICATION TOKEN =>', pushToken.data);
    return pushToken.data
  }
}