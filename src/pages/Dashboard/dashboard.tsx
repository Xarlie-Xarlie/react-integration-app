import React, { FormEvent, useState, useEffect } from 'react';
import api from '../../services/api';
import { Title, Form, Repositories, Error } from './styles';
import { FiChevronRight } from 'react-icons/fi';
import logo from '../../assets/2attachment.svg';
import { Link } from 'react-router-dom';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export default function Dashboard() {
  const [inputRepository, setInputRepository] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories'
    );

    if (storedRepositories) return JSON.parse(storedRepositories);
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories)
    );
  }, [repositories]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    //add a new repository
    event.preventDefault();

    if (!inputRepository) {
      setInputError('Please, type a author/repository.');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${inputRepository}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setInputRepository('');
      setInputError('');
    } catch (err) {
      setInputError('Repository not found, please try again.');
    }
  }

  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore Repositories on Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={inputRepository}
          onChange={e => setInputRepository(e.target.value)}
          type="text"
          placeholder="author/repository."
        />
        <button>Search</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight />
          </Link>
        ))}
      </Repositories>
    </>
  );
  }
