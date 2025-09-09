import express from 'express'

const shortenRouter = express.Router()

// Puerto del servidor
const PORT = process.env.PORT || 3000

shortenRouter.post('/', (req, res) => {
  const { url } = req.body
  if (!url) {
    return res.status(400).json({ error: 'URL requerida' })
  }
  // Aquí iría la lógica para acortar la URL
  const shortUrl = `http://localhost:${PORT}/s/${Math.random()
    .toString(36)
    .substr(2, 9)}`
  res.json({ originalUrl: url, shortUrl })
})

export default shortenRouter
