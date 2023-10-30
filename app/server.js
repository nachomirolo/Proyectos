const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const fs = require('fs');
const fetch = require('node-fetch');
const numeros = require("./public/numeros.js");

app.use(express.static("public"));

function delay(time, objWithVariable) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time)
   });
}

let addThousandsSeparator = (num) =>{
  num = Number(num).toFixed(2);
  let integer_part = Math.trunc(num);
  let decimal_part = String(num - integer_part).substr(2, 2);
  if (decimal_part.length == 0){
    decimal_part = "00";
  } else if (decimal_part.length == 1){
    decimal_part = decimal_part + "0";
  }
  let num_with_separator = String(integer_part).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return num_with_separator; //+ "," + decimal_part; 
}

app.get("/", async (request, response) => {
  let template_params = {
    number: request.query.number,
    date: request.query.date,
    condicion: request.query.condicion,
    name: request.query.name,
    address: request.query.address,
    phone: request.query.phone,
    email: request.query.email,
    ruc: request.query.ruc,
    timbrado: request.query.timbrado,
    items: request.query.items,
    discount: request.query.discount,
    total: request.query.total,
    total_letras: request.query.total,
    subtotal: request.query.total,
    subtotal_letras: request.query.total,
    iva10: request.query.total,
    iva10_letras: request.query.total,
    preview: request.query.preview
  };
  let html = "";
  fs.readFile("public/factura.html", "utf8", function(err, data){
    html = data;
    let regexp = /(\{\{([^\}\}]+)\}\})+/g;
    let params = html.match(regexp);
    params.forEach((param) =>{
      let param_key = param.substr(2, param.length-4);
      if (param_key=="items" && template_params.items){
        let items_arr = template_params.items.split("@");
        let items_table = "";
        items_arr.pop();
        items_arr.forEach((element) => {
          let item_data = element.split("|");
          let product_name = item_data[0];
          let item_quantity = item_data[1];
          let item_price = addThousandsSeparator(item_data[2]);
          let item_total = addThousandsSeparator(item_data[3]);
          items_table = items_table +
            `<tr>
                      <td class="item-linea">${item_quantity}</td>
                      <td class="item-linea">${product_name}</td>
                      <td class="item-linea">${item_price}</td>
                      <td class="item-linea">0</td>
                      <td class="item-linea" style="width:3%">0</td>
                      <td class="item-linea">${item_total}</td>
            </tr>`;
        });
        template_params.items = items_table;
      }
      else if (param_key=="number" && template_params.number){
        template_params.number = template_params.number.substr(9);
      }
      else if (param_key=="subtotal" && template_params.subtotal){
        template_params.subtotal_letras = numeros.numeroALetras(template_params.subtotal_letras);
        template_params.subtotal = addThousandsSeparator(template_params.subtotal);
      }
      else if (param_key=="iva10" && template_params.iva10){
        template_params.iva10 = Number(template_params.iva10)/11;
        template_params.iva10_letras = numeros.numeroALetras(template_params.iva10);
        template_params.iva10 = addThousandsSeparator(template_params.iva10);
      }
      else if (param_key=="total" && template_params.total){
        template_params.total_letras = numeros.numeroALetras(template_params.total_letras);
        template_params.total = addThousandsSeparator(template_params.total);
      }
      else if (param_key=="discount" && template_params.discount){
        template_params.discount = addThousandsSeparator(template_params.discount);
      }
      let param_value = template_params[param_key];
      if (param_value === undefined) param_value = "-";
      html = html.replace(param, param_value);
    });
  });
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    const config = {
      path: "public/factura.pdf",
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'A4',
    };
    await page.emulateMediaType('screen');
    await page.addStyleTag({path:'public/factura.css'});
    let pdf = await page.pdf(config);
    await browser.close();
    
    if (template_params.phone && template_params.preview == null){
      const body = {
        channelId: "27115674-dc9c-4010-8341-dd36f56d3321",
        chatId: template_params.phone,
        chatType: "whatsapp",
        contentUri: "https://facturagondwana.glitch.me/factura.pdf"
      };
      const fetch_response = await fetch('https://api.wazzup24.com/v3/message', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 77cf02a916d243e6ac4e9df877f6f97c'
        }
      });
      const fetch_data = await fetch_response.json();
      console.log(fetch_data);
    }
    
    response.type('application/pdf').send(pdf);
  } catch (error) {
    response.status(503).end(error.message);
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});