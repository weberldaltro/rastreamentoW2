import React, { useState } from 'react';
import { api } from './api';

import { Container, Button, DiretoryDownload } from '../src/styles/app';
import './styles/app.css';

const electron = window.require('electron');
const remote = electron.remote;
const { dialog } = remote;

const App = () => {
  const [path, setPath] = useState('Por favor, selecione uma pasta');
  const [hours, setHours] = useState('--:--');
  const [status, setStatus] = useState(false);
  const [timer, setTimer] = useState(undefined);

  function openPickFolder() {
    if (status) {
      return;
    }
    const folder = dialog.showOpenDialog({ properties: ['openDirectory'] });
    folder ? setPath(folder) : setPath('Por favor, selecione uma pasta');
  }

  function toggleStatus() {
    if (path === 'Por favor, selecione uma pasta') {
      window.alert('Por favor, selecione uma pasta');
      return;
    }

    if (status === false) {
      setStatus(true);

      request();
      setTimer(
        setInterval(() => {
          request();
        }, 900000)
      );
    } else {
      setStatus(false);
      clearInterval(timer);
      setTimer(undefined);
    }

    function request() {
      api
        .get('data', {
          headers: {
            path,
          },
        })
        .then((res) => {
          setHours(res.data.hours);
        })
        .catch(() => {
          window.alert('O download foi pausado!');
          setStatus(false);
        });
    }
  }

  return (
    <Container>
      <h1>{hours}</h1>
      <span>Último Download</span>
      <DiretoryDownload
        onClick={() => {
          openPickFolder();
        }}
      >
        <p>Salvar arquivos em:</p>
        <p>{path}</p>
      </DiretoryDownload>
      <Button onClick={() => toggleStatus()}>
        {!status ? <>Gerar TXT</> : <>Parar Downloads</>}
      </Button>
    </Container>
  );
};

export default App;
