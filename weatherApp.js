import express from 'express'
import routes from'./routes/routes.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', routes)

app.listen(port, () => {
    console.log(`Server runnig on port ${port}`)
})
