const express = require('express')
const cors = require('cors')
const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // if you're using cookies or auth headers
  })
)

app.get('/api', (req, res) => {
  res.json({ users: ['userOne', 'userTwo', 'userThree'] })
})

app.listen(5000, () => {
  console.log('Server started on port 5000')
})
