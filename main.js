const express = require('express')
const app = express()
const nunjucks = require('nunjucks')


app.set('view engine', 'html')
app.engine('html', nunjucks.render)
nunjucks.configure('views')


app.use(express.static('public'))
app.use(express.static('public/images'))
app.use(express.static('node_modules'))
app.use(express.static('js'))


app.get('/', (req, res, next) => {
  res.render('index')
})

app.listen(3000, function () {
  console.log('Listening on port 3000')
})

