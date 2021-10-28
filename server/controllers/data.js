import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import axios from 'axios';

const fs = require('fs');

export function data(req, res) {
  var path = req.headers.path;

  var objClient = [];

  try {
    axios
      .post('http://ap3.stc.srv.br/integration/prod/ws/getClientVehicles', {
        key: '154841bca3350b2a35dff52ecb070856',
        user: 'MONTCARGAS',
        pass: '623fdd700e25b227730d971f96e1e759',
      })
      .then((result) => {
        var data = result.data.data;

        data &&
          data.map((item) => {
            if (!item.date) return;

            if (item.latitude.length < 8){
              item.latitude = `${item.latitude}   `
            } else if (item.latitude.length < 9){
              item.latitude = `${item.latitude}  `
            } else if (item.latitude.length < 10){
              item.latitude = `${item.latitude} `
            }

            let plateLetter = item.plate.substring(0, 3)
            let plateNumber = item.plate.substring(3)

            // primeira alteração para quebras de linha na string (opcional)
            var dataString = `\n${item.date}${plateLetter}-${plateNumber}${item.latitude}${item.longitude}`;

            objClient.push(dataString);
          });

        if (objClient.length) {
          // segunda alteração para tratar o array como string e substituir caracteres indesejados
          objClient.push('\n');
          objClient = objClient.join('');
          objClient = objClient .replace('"', '');
          objClient = objClient .replace('[', '');
          objClient = objClient .replace(']', '');
          objClient = objClient.substring(1)
          var typeObj  = objClient;


          var hours = format(new Date(), 'HH:mm', { locale: ptBR });
          var date = format(new Date(), 'dd-MM-yyyy-HH-mm', { locale: ptBR });

          fs.writeFileSync(
            `${path}/veiculos-${date}.txt`,
            typeObj,

            function (erro) {
              if (erro) {
                throw erro;
              }
              console.log('Arquivo salvo');
            }
          );

          return res.json({ msg: 'Arquivo salvo', hours }).status(200);
        } else {
          return res
            .json({
              msg: 'O host remoto não retornou informações. Aguarde um minuto.',
            })
            .status(500);
        }
      });
  } catch {
    return res.json({ msg: 'Falha na conexão com host remoto' }).status(500);
  }
}
