# Quasar App (myapp)

A Quasar Framework app

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


### web打包成exe桌面应用步骤,例如：[electron-quick-start](https://github.com/electron/electron-quick-start)
	1. 全局安装打包神器electron-packager
	npm install electron-packager -g
   
	2. 在package.json文件中配置参数打包   
	"scripts": {
	      "start": "electron .",
	      "packager": "electron-packager . fukaiitapp --out fukaiitapp --arch=x64 --overwrite --ignore=node_modules"
	},
	 	package.json文件中的name属性不能含有中文和空格等特殊字符。
	 	然后便可运行命令npm run-script packager进行打包就会出现exe桌面应用程序。   

### quasar 1.7.4版本 electron 打包exe步骤
	注：发布（仅限electron-builder）
	执行命令：quasar build -m electron -P always
	在quasar.conf.js配置
	electron: {
	  bundler: 'builder', // set here instead of using command line flag --bundler
	  builder: {
	    appId: 'com.electron.myelectronapp',
	    win: {
	      target: 'nsis'
	    },
	    publish: {
	      'provider': 's3',
	      'bucket': 'myS3bucket'
	    }
	  }

### qusar [cordova文件配置说明](https://segmentfault.com/a/1190000013755356)
	1.cordova命令创建一个项目
		cordova create testApp com.test.app
		这里testAPP是项目的名字，testApp com.test.app是APP的包名，可以随意取，最好按照“com.” 开头;
		cd testApp 进入到刚刚创建的项目目录.
		说说目录中文件的用处:
		hooks：里面就一个readme.md文件，没什么卵用;
		platfroms：通过cordova platforms add android; 添加的安卓相关文件就放在里面，这个文件夹比较重要，打包生成的apk也在这个文件夹下;
		plugins：cordova安装的插件在此文件夹下;
		res:存放资源文件，我没有用到过;
		www：这个文件下写我们的项目，如html，js，css等代码;
		.npmignore：忽略文件，没什么用处;
		config.xml：打包项目的配置文件，可以修改APP的包名，应用名称等;
	2.cordova命令添加Android平台
		cordova platforms add android
		(如果是想移除Android平台的，可以运行cordova platforms remove android，也可以安装指定版本的Android平台，cordova platforms add android@6.3.0)
		运行命令后，会生成一些新文件夹，node_modules是依赖文件，在platfroms下面会生成新加入的Android平台文件
		另外:
		安装插件 cordova plugin add 插件名，如：cordova plugin add cordova-hot-code-push-plugin
		卸载插件 cordova plugin remove 插件名，如：cordova plugin remove cordova-hot-code-push-plugin
		查看安装的插件列表 cordova plugin list
    3.cordova命令编译打包apk
	    cordova build android
	    注意：使用quasar框架打包quasar build -m [android|ios]
		执行命令后，会在testApp\platforms\android\build\outputs\apk目录下生成一个android-debug.apk，这就完成了一个简单的打包，把这个apk安装在手机上，就可以运行了。
		但是，上面生成的是一个测试的apk，没有任何签名信息，不能上架到各大应用平台，下面来讲一下打包一个有签名的apk。
		apk签名：
			1.第一步
				在项目根目录下运行命令cordova build --release android,会在testApp\platforms\android\build\outputs\apk目录下生成一个android-release-unsigned.apk
			2.第二部
				在testApp目录打开cmd命令运行命令keytool -genkeypair -alias name.keystore -keyalg RSA -validity 4000 -keystore name.keystore
				执行以上命令后，会要求填写密码口令，单位信息等等，这里需要记住录入的密码，因为最后编译apk的时候还需要用到，在所有的选项都录入完后，按回车，会在项目的根目录下生成一个name.keystore的签名文件，里面就包含刚刚录入的一些信息。
				会在根目录下生成一个name.keystore,这是apk独有的签名证书,如下图(命令中的name.keystore中的name是签名文件的名字，这里可以任意取名，我习惯用name.keystore)
			3.第三部
				将testApp\platforms\android\build\outputs\apk目录下生成一个android-release-unsigned.apk重命名为name_unsigned.apk(我为了与name.keystore对应)，并将它和根目录下的name.keystore放在同一目录下
			4.第四部
				进入dabao这个文件夹下，运行命令jarsigner -verbose -keystore name.keystore -signedjar name.apk name_unsigned.apk name.keystore,输入之前签名的录入的密码(我自己测试输入密钥口令123456)，经过编译，会生成最后的签名版本 name.apk.
				jarsigner -verbose:签名命令标识符。
				-keystore:后面跟着的是你签名使用的密钥文件(keystore)的绝对路径。
				-signedjar:此后有三个参数：
				参数一:签名后生成的apk文件所要存放的路径。
				参数二:未签名的apk文件的存放路径。
				参数三:你的证书名称，通俗点说就是你keystore文件的别名

