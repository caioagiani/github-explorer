import React, { useEffect, useState } from 'react';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { useRouteMatch, Link } from 'react-router-dom';

import Logo from '../../assets/img/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

import api from '../../services/api';

const Repository = () => {
  const [repository, setRepository] = useState(null);
  const [issues, setIssues] = useState([]);

  const { params } = useRouteMatch();

  useEffect(() => {
    async function loadDataResponse() {
      const [repositorie, issue] = await Promise.all([
        api.get(`repos/${params.repositorie}`),
        api.get(`repos/${params.repositorie}/issues`),
      ]);

      setRepository(repositorie.data);
      setIssues(issue.data);
    }

    loadDataResponse();
  }, [params.repositorie]);

  return (
    <>
      <Header>
        <img src={Logo} alt="Rocket Logo" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Starts</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
