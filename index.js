const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// This will be our application entry. We'll setup our server here.
const http = require('http');
// Set up the express app
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static((__dirname, 'public')));
var json2csv = require('json2csv').parse;
var fs = require('fs');

// adding csv file 


const saveCsvFile =(req,res)=>{
    var newLine = '\r\n';
    const appendThis = req.body
  console.log((appendThis))
    // var fields = [ 'الاسم' , 'title'];
    var fields = [
      "المبيعات",
      "الكلف",
      "الربح",
      "رضا الزبون",
      "مرونة الخدمات المقابلة لاحتياجات الزبون",
      "جودة اداء التوصيل",
      "SCRT",
      "استغلال القدرة",
      "المخزون اليومي",
      "نسبة المخلفات",
      "معدل زيادة الربح",
      "مشاركة المعلومات",
      "فترة الاستجابة للمنتوجات الجديدة",
      "معدل التسليم في الوقت المحدد",
      "المرونة",
      "الجودة"
    ]

    
  
    fs.stat('file.csv', function (err, stat) {
      if (err == null) {
        console.log('File exists');
    
        // write the actual data and end with newline

        var csv = json2csv(appendThis,{header:false,withBOM:true}) + newLine;
    
        fs.appendFile('file.csv', csv, function (err) {
          if (err){

            return res.status(400).send({mesg:'data not appended to file'})
          };
          return res.status(200).send({mesg:'C200'})

          console.log('The "data to append" was appended to file!');
        });


      } else {
        //write the headers and newline
        fields = fields + newLine;
    
        fs.writeFile('file.csv', fields,'utf8', function (err) {
          if (err) {
            
            return res.status(400).send({mesg:'data not appended to file'})
          };
          return res.status(200).send({mesg:'C200'})
        });
      }
    });
}


app.get('/data', (req, res) =>  res.sendFile((__dirname+'/index.html')));


app.post('/data', (req, res) =>  {


    saveCsvFile(req,res)
   
});


app.get('*', (req, res) => res.status(200).send({
    
    message: 'nothin here hahha.',

}));
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;