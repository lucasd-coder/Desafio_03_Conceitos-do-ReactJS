import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio ReactMobile ${Date.now()}`,
      url: "https://github.com/lucasd-coder/desafio_nodejs_n1_conceitos.git",
      techs: ["Node.js"]
    });

    const repositorys = response.data;

    setRepository([...repository, repositorys]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepository(repository.filter(
      repositories => repositories.id !== id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repositories => (
          <li key={repositories.id} >
            {repositories.title}

            <button onClick={() => handleRemoveRepository(repositories.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
