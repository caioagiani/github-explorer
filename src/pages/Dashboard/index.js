import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { FiChevronRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import Logo from '../../assets/img/logo.svg';

import { Error, Title, Form, Repositories } from './styles';

const Dashboard = () => {
  const [newRepo, setNewRepo] = useState('');

  const [inputError, setInputError] = useState('');

  const [repositories, setRepositories] = useState(() => {
    const storageRepositories = localStorage.getItem('@Github:respositories');

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@Github:respositories', JSON.stringify(repositories));
  }, [repositories]);

  async function handleAddRepository(e) {
    e.preventDefault();

    if (!newRepo) {
      return setInputError('Digite o autor/nome do repositório.');
    }

    try {
      const { data } = await api.get(`/repos/${newRepo}`);

      setRepositories([...repositories, data]);
      setNewRepo('');
      setInputError('');
    } catch (error) {
      return setInputError('Erro ao buscar este repositório.');
    }
  }

  return (
    <>
      <img src={Logo} alt="Rocket Logo" />
      <Title>Explore repositórios no GitHub</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <Link key={repository.id} to={`/repository/${repository.full_name}`}>
            <img src={repository.owner.avatar_url} alt={repository.name} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
