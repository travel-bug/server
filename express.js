const express = require ('express');
const app = express ();


app.get('/',function (request, response){
    console.log('you did it');
    res.send({name : 'Batman'});
});

app.listen(process.env.port || 3000, function(){
    console.log('listening');
});



