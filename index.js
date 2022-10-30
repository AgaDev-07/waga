const waga = require('./dist')

const app = waga()
const router = waga.Router()

app.use('router',router)

router.get('*', (req, res) => {
  res.status(404).send('Not found')
})

router.get('/', (req, res) => {
  res.send('Hello World')
})

const test = (req, res) => {
  res.json({body: req.body, params: req.params, query: req.query})
}
router.get('/:type/:object', test)
router.get('types/:object', test)
router.get('/:types/World', test)

app.use(waga.static('./public'))
app.use(waga.json())
router.get('/test', (req, res) => {
  res.redirect('https://agacraft.ga/src/img/fondo.png')
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})

console.log(app.METHODS)