# College X Admin

## **How to run the project**

**Step 1**:  Make sure you have expo installed. If you dont have it installed then you could run the following command to install it.
```
  npm i -g expo-cli
```

**Step2**: Install the dependecies. You can do that by running 
```
  expo install
```

**Step 3**: Run dev server: 
```
  expo start
```

**Step 4**: Run the dev server
```
  expo start
```

**Step 4**: You can choose to run the app on either an emulator or on an android device

  * **Run on android device** - 
    _Note: Make sure that both your phone app and laptop are connected to same network_
    1. Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_IN&gl=US) app from playstore
    2. Open Expo app and scan the qr-code from the terminal
    3. It would take some time and probably show something like getting updates. After that you could use your app on device.
    
  * **Run on emulator**: You might want to take a look at [this](https://docs.expo.dev/workflow/android-studio-emulator/) 

## Notes
1. If you encounter some warning while running the app about unmet dependencies or unsupported version of an installed library, you might want to run 
```
  expo doctor
```

## Configure app for build
The [app.json](app.json) file is place where configuration can be done.. 

Some basic configuration options are - 
- Name, slug, version etc can also be configured as per requirements.
- We can configure the splash screen in app.json file. We just need to add the filepath to the image and expo would show the image for us.

You can see details on the configuration options in [expo's website](https://docs.expo.dev/workflow/configuration/)



## How to Build the Android app

For android apk build we need to run following command. 
```
  expo build:android -t apk
```

1. If it is your first time building the app then expo might ask you to create or login to account.
2.  it might also create a keystore which is something that is required for apk. It would take around 15-30 min to build the app. 
3.  Then it return a link. You can click the link to download the apk.

You can read complete instruction on expo's website [here](https://docs.expo.dev/classic/building-standalone-apps/#3-start-the-build)

If you get stuck somewhere during build process. I found this video to be helpful [this](https://youtu.be/7OOE4rQf7zI) video might help.
