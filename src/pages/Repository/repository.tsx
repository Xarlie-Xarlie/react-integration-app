import React, { useEffect, useState } from 'react';
import logo from '../../assets/2attachment.svg';
import { useParams, Link } from 'react-router-dom';
import { Header, RepositoryInfo, Issues } from './styles';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

interface RepositoryInterface {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  html_url: string;
  title: string;
  user: {
    login: string;
  };
}

export default function Repository() {
  const { authorName, repositoryName } = useParams();
  const [repository, serRepository] = useState<RepositoryInterface | null>(
    null
  );
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api.get(`repos/${authorName}/${repositoryName}`).then(response => {
      serRepository(response.data);
    });
    api.get(`repos/${authorName}/${repositoryName}/issues`).then(response => {
      setIssues(response.data);
    });
  }, [authorName, repositoryName]);

  return (
    <>
      <Header>
        <img src={logo} alt="github logo" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Back
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
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map(issue => (
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
}

// export default Repository;
