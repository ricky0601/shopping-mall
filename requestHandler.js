const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response){
    console.log('main');

    mariadb.query('select * from product', function(err, rows){
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}

function favicon(response) {
    console.log("favicon");
}

function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function blueRacket(response){
    fs.readFile('./img/blueRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function blackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function order(response, productId){
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("insert into orderlist values ("+productId + ", '" + new Date().toLocaleTimeString() + "');", function(err, rows){
        console.log(err);
        console.log(rows);
    })

    response.write('order page');
    response.end();
}

function orderlist(response){
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("select * from orderlist", function(err, rows){
        response.write(orderlist_view);
        
        rows.forEach(element => {
            response.write("<tr>"
                        + "<td>" + element.product_id + "</td>"
                        + "<td>" + element.order_date + "</td>"
                        + "</tr>");
        });
        
        response.write("</table>");
        response.end();
    })
}

let handle = {}; //{} 는 key:value 쌍으로 이루어진 상자

handle['/'] = main; 
handle['/order'] = order;
handle['/orderlist'] = orderlist;
handle["/favicon.ico"] = favicon;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;