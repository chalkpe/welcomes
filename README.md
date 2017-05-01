# welcomes [![CircleCI]](https://circleci.com/gh/ChalkPE/welcomes) [![npm version]](https://www.npmjs.com/package/welcomes) [![npm downloads]](https://www.npmjs.com/package/welcomes) [![JavaScript Style Guide]](https://standardjs.com)
Welcome message for shells

![Main screenshot]

## Installation
```bash
$ npm install -g welcomes
```

## Usage
Add `welcomes --config config.json`
or `welcomes time hangang custom-a custom-b --configs`
to your [run commands](https://en.wikipedia.org/wiki/Run_commands) file (`.bashrc`, `.bash_profile` or `.zshrc` etc.)

* Pre-installed plugins: `time`, `hangang`, `dimibob`
* `custom-a` is short for `welcomes-plugin-custom-a` npm package

## Configuration

### Basic

| Key | Description | Default |
| :---: |  :-------: | :---: |
| `dev` <br> -> `boolean` | `false`일 경우 **에러 메세지**가 출력되지 않습니다. | `false` |
| `verbose` <br> -> `boolean` | `true`일 경우 **현재 설정**이 출력됩니다. | `false` |
| `timeout` <br> -> `number` | 요청 타임아웃, 밀리초 단위 ([`axios` 문서 참고](https://github.com/mzabriskie/axios#request-config)) | `0` |
| `encoding` <br> -> `string` | 인코딩 ([`axios` 문서 참고](https://github.com/mzabriskie/axios#request-config)) | `'utf-8'` |

#### `time` plugin
| Key | Description | Default |
| :---: |  :-------: | :---: |
| `locale` <br> -> `string` | 출력할 시간의 로케일 ([`moment` 문서 참고](http://momentjs.com/docs/#/i18n/)) | `null` |
| `format` <br> -> `string` | 출력할 시간의 날짜 포맷 ([`moment` 문서 참고][Moment format]) | `'HH:mm:ss'` |
| `style` <br> -> `string` | 출력할 텍스트의 스타일 ([`chalk` 문서 참고](https://github.com/chalk/chalk#modifiers)) | `null` |
| `color` <br> -> `string` | 출력할 텍스트의 배경색, `bg` 제외. ([`chalk` 문서 참고](https://github.com/chalk/chalk#background-colors)) | `'white'` |
| `fgColor` <br> -> `string` | 출력할 텍스트의 전경색 ([`chalk` 문서 참고](https://github.com/chalk/chalk#colors)) | `'black'` |

#### `dimibob` plugin
| Key | Description | Default |
| :---: |  :-------: | :---: |
| `ignoreSnack` <br> -> `boolean` | `true`일 경우 **21시 40분 이전**에도 **간식** 대신 **다음 아침 메뉴**를 출력합니다. | `false` |
| `onlyToday` <br> -> `boolean` | `true`일 경우 21시 40분부터 자정까지는 아무 것도 출력하지 않습니다. <br> `false`일 경우 21시 40분부터 익일 8시 45분까지 **다음 아침 메뉴**를 출력합니다. | `false` |
| `cmd` <br> -> `string` | 출력할 명령어 이름 | `'dimibob'` |
| `cmdFormat` <br> -> `string` | 출력할 명령어 인자의 날짜 포맷 ([`moment` 문서 참고][Moment format]) | `'dimibob'` |
| `likes` <br> -> `string` | 좋아하는 급식 리스트 ([예시](https://gist.github.com/ChalkPE/caa1bc049d99bb178a2fde65c5946db4)) 파일의 경로 <br> `null`이 아닐 경우 해당되는 메뉴의 텍스트가 강조됨. | `null` |
| `likesColor` <br> -> `string` | `likes`가 `null`이 아닐 경우에만 필요 <br> 좋아하는 메뉴 텍스트의 강조 스타일 ([`chalk` 문서 참고][Chalk styles]). | `'blue'` |
| `server` <br> -> `string` | 디미고 급식 API의 주소. <br> URL 파리미터 `d`로 날짜를 지정할 수 있어야 함. | [여기][Dimibob server] |
| `paramFormat` <br> -> `string` | URL 파리미터 `d`의 날짜 포맷 ([`moment` 문서 참고][Moment format]) | `'YYYYMMDD'` |

#### `hangang` plugin
| Key | Description | Default |
| :---: |  :-------: | :---: |
| `icon` <br> -> `string` | 온도 좌측에 표시될 이모지 | `'🌡'` |
| `style` <br> -> `string` | 출력할 텍스트의 스타일 ([`chalk` 문서 참고][Chalk styles]) | `null` |
| `fgColor` <br> -> `string` | 출력할 텍스트의 전경색 ([`chalk` 문서 참고](https://github.com/chalk/chalk#colors)) | `'black'` |
| `server` <br> -> `string` | 한강 온도 API의 주소. <br> JSON으로 응답해야 하며, `temp` 필드가 현재 온도 값이어야 함. | [여기][Hangang server] |

### Via CLI argument
```bash
$ welcomes time dimibob hangang \
  --dev --verbose --timeout 5000 \
  \
  --time:locale ko --time:format LLLL \
  --time:color yellow --time:fgColor magenta --time:style underline \
  \
  --dimibob:ignoreSnack \
  --dimibob:cmd bob --dimibob:cmdFormat L \
  --dimibob:paramFormat YYYYMMDD \
  --dimibob:server "http://dimigo.in/pages/dimibob_getdata.php" \
  --dimibob:likes ./favorites.txt --dimibob:likesColor yellow_underline_bold \
  \
  --hangang:icon='★' \
  --hangang:server "http://hangang.dkserver.wo.tc" \
  --hangang:style underline --hangang:fgColor red_bold
```

### Via config file
```bash
$ cat welcomes.json
{
  "_": [
    "time",
    "dimibob",
    "hangang"
  ],

  "dev": true,
  "verbose": true,
  "timeout": 5000,

  "time": {
    "color": "yellow",
    "fgColor": "magenta",
    "style": "underline",

    "locale": "ko",
    "format": "LLLL"
  },

  "dimibob": {
    "cmd": "bob",
    "cmdFormat": "L",

    "onlyToday": false,
    "ignoreSnack": true,

    "likes": "./favorites.txt",
    "likesColor": "yellow_underline_bold",

    "paramFormat": "YYYYMMDD",
    "server": "http://dimigo.in/pages/dimibob_getdata.php"
  },

  "hangang": {
    "icon": "★",
    "style": "underline",
    "fgColor": "red_bold",

    "server": "http://hangang.dkserver.wo.tc"
  }
}

$ welcomes --config welcomes.json
```

### Output
![Usage screenshot]

## License
[MIT License](LICENSE)

[Chalk styles]: https://github.com/chalk/chalk#styles
[Moment format]: http://momentjs.com/docs/#/displaying/format/
[Dimibob server]: http://dimigo.in/pages/dimibob_getdata.php
[Hangang server]: http://hangang.dkserver.wo.tc


[Main screenshot]: http://i.imgur.com/Yu9YI4k.png
[Usage screenshot]: http://i.imgur.com/sFkgZSh.png

[npm version]: https://img.shields.io/npm/v/welcomes.svg
[npm downloads]: https://img.shields.io/npm/dt/welcomes.svg

[CircleCI]: https://circleci.com/gh/ChalkPE/welcomes.svg?style=svg
[JavaScript Style Guide]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
