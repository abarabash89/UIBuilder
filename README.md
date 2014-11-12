#UIBuilder
=========


##Main CSS file(Development version)

```
bin/dev/common.css
```

##Main CSS file(Production version)

```
bin/production/common.css
```

##Demo and examples source code all UI components

```
documentation/documentation.html
```

##Installation

###Need:

 * [node.js](http://nodejs.org)
 * [npm](https://www.npmjs.org)
 * [stylus](http://learnboost.github.io/stylus)
 * [PhantomCSS](https://github.com/Huddle/PhantomCSS)
 * [Gulp](http://gulpjs.com)
 * [CasperJS](http://casperjs.org)

###Installation dependencies
```
    npm install -g gulp
    npm install
```

##Build project
```
    gulp build
```

##Build css(Production version)
```
    gulp buildCss-production
```
    
##Build css(Development version)
```
    gulp buildCss-dev
```

##Build documentation
```
    gulp doc-build
```
```

##Create element documentation
```
    gulp create --name NameElement
```
