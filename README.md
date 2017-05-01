# welcomes [![CircleCI]](https://circleci.com/gh/ChalkPE/welcomes) [![JavaScript Style Guide]](https://standardjs.com)
Welcome message for shells

![Main screenshot]

## Installation
```bash
$ npm install -g welcomes
```

## Configuration

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

[Main screenshot]: http://i.imgur.com/Yu9YI4k.png
[Usage screenshot]: http://i.imgur.com/sFkgZSh.png
[CircleCI]: https://circleci.com/gh/ChalkPE/welcomes.svg?style=svg
[JavaScript Style Guide]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
