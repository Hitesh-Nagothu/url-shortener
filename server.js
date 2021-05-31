const express = require('express')
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');
const shortUrl = require('./models/shortUrl')
const app = express();

mongoose.connect('mongodb:localhost/urlSHortener', {
    useNewUrlParser:true, useUnifiedTopology:true
})
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    const shortUrl = await shortUrl.find()
    res.render('index', { shortUrl : shortUrl})
})

app.get('/:shortUrl', async (req, res)=> {
   const shorterUrl= await shortUrl.findOne({ short : req.params.shortUrl })

   if (shorterUrl == null) return res.sendStatus(404)

   shortUrl.clicks++
   shortUrl.save()

   res.redirect(shortUrl.full)
})

app.post('/shortUrls', async (req, res)=>{
   await shortUrl.create({
        full : req.body.fullUrl
    })

    res.redirect('/')
})


app.listen(process.env.PORT || 5000);
