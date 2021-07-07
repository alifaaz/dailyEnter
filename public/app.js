
// elrbh = sales-masaref


const getELement = (id) => {
  return parseFloat($(`#${id}`).val())
}

const clearFields = () => {
  [ 'sales',
    'cost',
    'satisfied',
    'flexible',
    'jwda',
    'SCRT',
    'estglal',
    'mkhzoon',
    'mkhalfat',
    'zyada',
    'share',
    'fatra',
    'taslem',
    'mrona',
    'eljwda'].forEach(val=> {
      $(`#${val}`).val('')
    })

}




const doStuff =(e)=>{
  const data = 
  {
    "المبيعات": getELement('sales'),
    "الكلف" :getELement('cost'),
    "الربح": getELement('sales') - getELement('cost') ,
    "رضا الزبون":getELement('satisfied'),
    "مرونة الخدمات المقابلة لاحتياجات الزبون":getELement('flexible'),
    "جودة اداء التوصيل":getELement('jwda'),
    "SCRT":getELement('SCRT'),
    "استغلال القدرة":getELement('estglal'),
    "المخزون اليومي":getELement('mkhzoon'),

    "نسبة المخلفات":getELement('mkhalfat'),

    "معدل زيادة الربح":getELement('zyada'),
    "مشاركة المعلومات":getELement('share'),
    "فترة الاستجابة للمنتوجات الجديدة": getELement('fatra'),
    "معدل التسليم في الوقت المحدد":  getELement('taslem'),
    "المرونة":getELement('mrona'),
    "الجودة" : getELement('eljwda'),
  }
  $.ajax(
    {
      url: "/data", 
      method:'post',
      data,
      success: function(result){
          alert("نجحت باضافة البيانات لقاعدة البيانات الخاصة بك")
          clearFields()
  },

  error:function(e){
    console.log(e)
    alert('error no this is bad')
  }

});
 

}



const submit = document.getElementById('submit')

submit.addEventListener('click',doStuff)