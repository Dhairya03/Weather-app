const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app=express()

//define paths for express config
const publicDirectoryPath=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Dhairya Gupta'
    })
})

// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Dhairya',
        text:'this is a heplful text'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Dhairya Gupta'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{

        if(error){
            return res.send({error})
        }
        // console.log('Error',error)
        // console.log('Data',data)
       // const {latitude, longitude, location}=data
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
          })
    })
    // res.send({
    //     forecast:res.forecastData,
    //     location:res.location,
    //     address:req.query.address
    //     })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        msg:'Help article not found',
        title:'404',
        name:'Dhairya'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        msg:'My 404 page',
        title:'404',
    name:'Dhairya'})
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
}) 

//app.com
//app.com/help
//app.com/about
