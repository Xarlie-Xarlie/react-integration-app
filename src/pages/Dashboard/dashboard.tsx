import React, { FormEvent, useState } from 'react';
import api from '../../services/api';
import { Title, Form, Repositories } from './styles';
import { FiChevronRight } from 'react-icons/fi';
import logo from '../../assets/2attachment.svg';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [inputRepository, setInputRepository] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    //add a new repository
    event.preventDefault();

    const response = await api.get<Repository>(`repos/${inputRepository}`);
    const repository = response.data;

    setRepositories([...repositories, repository]);
    setInputRepository('');
  }

  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore Repositories on Github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={inputRepository}
          onChange={e => setInputRepository(e.target.value)}
          type="text"
          placeholder="Type the name of repository"
        />
        <button>Search</button>
      </Form>

      <Repositories>
        {repositories.map(repository => (
          <a key={repository.full_name} href="test">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
