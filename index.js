const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyparser= require('body-parser');
const cookieparser = require('cookie-parser');
const route = require('./routes');

const db = require('./config/db');
//apply

const app = express();
app.use(cookieparser('back-end-web-2020-vnua'));
db.connect();
app.use(express.static(path.join(__dirname, 'public')));

// handlebras&body-parser
app.engine('handlebars', exphbs({
    helpers: {
        sum: (a, b)=>a+b,
        admin: (name, color)=>{
            if (name === 'Admin'){
                let out = `<td class="text-warning">`;
                out = out +color;
                return out + `</td>`;
            }else {
                let out = `<td>`;
                out = out +color;
                return out+`</td>`;
            }
        },
        pagination: ( total,size,page ) =>{
            var pages = Math.ceil(total / size); 
            let out = `<ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="?page=`+1+`">Trang đầu</a>
                            </li>
            `;
            for (var i = 1; i <= pages;i++){
                if (i == page){
                  out = out + `
               <li class="page-item active">
                    <a class="page-link" href ="?page=`+i+`">`+i+`</a>
               </li>
               `   }else{
                out = out + `
                <li class="page-item">
                     <a class="page-link" href ="?page=`+i+`">`+i+`</a>
                </li>
                `
               }
            }
                return out + `<li class="page-item">
                <a class="page-link" href="?page=`+pages+`">Trang cuối</a>
              </li>
            </ul>`;
        },
        time: (timesta) => {
            var time = Number(timesta);
            var datenow = new Date();
            var age = Math.abs(datenow - time);
            var unti ='';
            var out = '';
                if (age < 60000) {
                    return out = "Vừa xong";
                }
                else {
                    if (age >=60000 && age <3600000) {
                    age = Math.round(age/1000/60);
                    unti = 'phút';
                    }
                    else if (age >= 3600000 && age <= 86400000) {
                        age = Math.round(age/1000/60/60);
                        unti = 'giờ';
                    }
                    else{
                        age = Math.round(age/1000/60/60/24);
                        unti = 'ngày';
                    }
                    return out = age +" "+ unti + " trước";
                }
        },

        count: (num) => {
            if (num == 0) {
                return `<p class ="text-center">Không có góp ý nào trong hòm thư <a href="/"> Quay về trang chủ </a></p>`
            }else {
                return `<p class ="text-right"><a href="/admin/pinread" class ="text-danger">Đánh dấu tất cả là đã đọc</a></p>`
            }
        },
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

//apply routes
route(app);
const port = process.env.PORT || 8800;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));