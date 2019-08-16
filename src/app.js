const express=require('express')
const path=require('path')
const hbs=require('hbs','')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app= express()


// define path for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// set up Handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory 
app.use(express.static(publicDirectoryPath))



app.get('',(req,res)=>{
    res.render('index',{
        title:'WEATHER REPORT',
        name:'YaHeng Cai'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'ABOUT ME',
        name:'YaHeng Cai'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'It is snowing',
        loation:'Melbourne',
        title:'HELP',
        name:'YaHeng Cai'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products',(req, res)=>{

    if(!req.query.search){
        return     res.send({
            error:'you must provide a search item'
        })
    }
    res.send({
        product:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Yaheng cai',
        errorMessage:'can not help the article'
    })
})

app.get('*',(req,res)=>{
    res.render('404.hbs',{
        title:'404',
        name:'Yaheng cai',
        errorMessage:'page not found'
    })
})


app.listen(3000,()=>{
    console.log('Mynnae is heng')
})
