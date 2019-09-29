const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
app.use(cors())
app.get('/api', (req, res) => {
  // console.log(req.query)
  const path = `C:\\project\\vue-ele-admin\\src\\api\\${req.query.name}`
  const file = fs.readFileSync(path, { encoding: 'utf-8' })
  res.send(file)
})
app.listen(3000)
