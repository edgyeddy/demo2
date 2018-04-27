2018-04-27

TIME MANAGEMENT:
dm - 2h installing react-native for linux, unsuccessfully.
dx - 2.5h following a great tutorial to completion. Scroll (non-infinite) list crashes, webview pending.
dj - 3h learning flex styling, learning basic javascript, implementing navigation and webview.
dv - 2.5h converting the app to kotlin and with a bundled JS. Pretty-print code. Publish apk.


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
	https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes#32647583
	
INSTALL:
		install git
		install visual-studio code --> shift+alt+F = pretty print
		install android-studio + android-sdk
		install cygwin
		install node.js 8.x
		install curl
		BIOS enable VT-x
		$ 	export PATH=${PATH}:/cygdrive/d/Programari/Android/android-sdk/platform-tools/
		$	npm install -g react-native-cli
		NO! $	npm install sugarjs
		install yarn	
		$	react-native init demo1
		$ echo "sdk.dir = ..\\..\\..\\..\\..\\Programari\\Android\\android-sdk" > android/local.properties
		$	react-native run-android (from ./demo2/demo2 to restart app)
		$ android-sdk/tools/bin/avdmanager.bat --> Start AVD
		run demo1 app from emulator
		r/r to reload view, ctrl+m to show menu
		$ react-native start (from ./demo2/demo2 to restart server)
		$ yarn add react-navigation (from PWD!)		
		$ react-native log-android (to view logs)
		// Cleanup
		$ cd android && gradlew clean && cd ..
		$ adb reverse tcp:8081 tcp:8081 // To test the apk in a real device.
		// Copy server-provided JS bundle into Android assets. 
		//$ curl "http://localhost:8081/index.android.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"
		$ curl "http://localhost:8081/index.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"
		
LICENSE: 
	http://www.wtfpl.net/txt/copying/		
		
TODO:
	* git
	* github
	* icon + launcher
	* pretty-print
	* multi-search
	* web-view
	* scroll
	* infinite-scroll (with pages)
	* demo2 kotlin
	* generate apk --> publish to app store
	* send email