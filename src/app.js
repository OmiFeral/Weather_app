const path = require('path');
const express =  require('express');
const hbs = require('hbs');
const geocode =  require('./utils/geoCode');
const forcast = require('./utils/ForeCast');
const { response } = require('express');
const { forecast } = require('./utils/ForeCast');

const app = express();

// setup handlebar engin and location
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'../template/views'));

//setup static dirctory to serve
app.use(express.static(path.join(__dirname,'../Public')));

hbs.registerPartials(path.join(__dirname,'../template/partials'));


app.get('',(req,res) => {
    res.render('index',{
        title : 'Wether app',
        name : 'Omkar Navik' 
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Dynamic',
        name : 'Priyazee'
    });
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help Dynamic',
        name : 'Omkar Navik' 
    });
})


app.get('/weather',(req,res) => 
{
    if(!req.query.address)
    {
        return res.send({
            error:'You must have to provide address'
        });
    }
    
    geocode.geoCode(req.query.address,(error,{latitutde,longitude,location} = {}) => 
    {
        if(error)
        {
            return res.send({
               error:error,
            });
        }
        
       forcast.forecast(latitutde,longitude,(error,forecast) => 
       {
           if(error){
               return res.send({
                   error,
                  
               });
           }

           res.send({
               location:location,
               Message:forecast,
               address:req.query.address
           });
                
       });


    });
   
   
});


app.get('/help/*',(req,res) => {
    res.render('helpError',{
        title:'Help Error Page',
        Message : 'Help artical not found'
    })
});

app.get('*',(req,res) => {
     res.render('Error',{
         title:'Error Page',
         Message:'404 Page not found '
     })
})
app.listen(3000,() => {
    console.log('Server is up on port 3000');
})