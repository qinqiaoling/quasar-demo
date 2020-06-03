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


    
