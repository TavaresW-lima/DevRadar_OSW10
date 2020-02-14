import React, { useState, useEffect } from 'react';
import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css';
import './App.css';
import './sidebar.css';
import './main.css';

//Componente: Bloco isolado de HTML, CSS, JS que não interfere no restante da aplicação
//Propriedades: Comparáveis a Atributos de HTML, são dados para componentes em React pelo seu componente PAI
//Estado: Informações mantidas pelo componente. (Imutabilidade)

function App() {

  const [devs, setDevs] = useState([]);

  async function handleAddDev(data){

    const response = await api.post('/devs',data);

    setDevs([...devs, response.data]);
  }

  
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  }, [])

  return (
    <div id="app">
      <aside>
      <strong>Cadastrar</strong>
            <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key ={dev._id} dev={dev} />
          ))}        
          
        </ul>
      </main>
    </div>
  );
}

export default App;
