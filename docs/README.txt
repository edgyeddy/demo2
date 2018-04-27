2018-04-27

TIME MANAGEMENT:
dm - 2h installing react-native for linux, unsuccessfully.
dx - 2.5h following tutorial to completion. Scroll (non-infinite) list crashes, webview pending.
dj - 3h learning flex styling, learning basic javascript, implementing navigation and webview.
dv - 1h converting the app to kotlin and with a bundled JS.


DATA SOURCE:
	https://jobs.github.com/positions.json?page=0
	
	
HELPFUL URLs:
	https://reactnativecode.com/infinite-list-flatlist-pagination-load-more-data/
	https://jgilfelt.github.io/AndroidAssetStudio/
	https://jobs.github.com/api
	https://www.raywenderlich.com/178012/react-native-tutorial-building-android-apps-javascript
	https://yarnpkg.com/en/docs/install#windows-stable
	https://nodejs.org/en/
	http://localhost:8081/index.bundle?platform=android
	https://reactjs.org/docs/jsx-in-depth.html
	
INSTALL:
		install git
		install visual-studio code --> shift+alt+F = pretty print
		install android-studio + android-sdk
		install cygwin
		install node.js 8.x
		BIOS enable VT-x
		$ 	export PATH=${PATH}:/cygdrive/d/Programari/Android/android-sdk/platform-tools/
		$	npm install -g react-native-cli
		NO! $	npm install sugarjs
		install yarn	
		$	react-native init demo1
		$ echo "sdk.dir = ..\\..\\..\\..\\..\\Programari\\Android\\android-sdk" > android/local.properties
		$	react-native run-android (from ./demo2/demo2 to restart app)
		$ android-sdk/tools/bin/avdmanager.bat --> Start AVD
		run demo1 app from device
		r/r to reload view, ctrl+m to show menu
		$ react-native start (from ./demo2/demo2 to restart server)
		$ yarn add react-navigation (from PWD!)		
		$ react-native log-android (to view logs)
		Cleanup
		$ cd android && gradlew clean && cd ..
		$ adb reverse tcp:8081 tcp:8081 // To test the apk in a real device.
		// Copy server-provided JS bundle into Android assets. 
		//$ curl "http://localhost:8081/index.android.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"
		$ curl "http://localhost:8081/index.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"
		
TODO:
	git
	github
	icona + launcher
	pretty-print
	multi-cerca
	pantalla web-view
	scroll
	infinite-scroll amb pàgines
	demo2 kotlin
	generar apk --> publicar app store
	email acabat