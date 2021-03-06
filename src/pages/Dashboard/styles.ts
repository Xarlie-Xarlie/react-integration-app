import styled from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const Form = styled.form.attrs((props: { hasError: boolean }) => props)`
  margin-top: 40px;
  max-width: 700px;
  display: flex;
  input {
    color: #3a3a3a;
    padding: 0 24px;
    flex: 1;
    height: 70px;
    border: 0;
    border-radius: 5px 0 0 5px;
    border: 2px solid #fff;

    border-color: ${props => (props.hasError ? '#c53030' : '#fff')};

    &::placeholder {
      color: #a8a8b3;
    }
  }
  button {
    width: 210px;
    color: #fff;
    background: #04d361;
    border: 0;
    font-weight: bold;
    height: 70px;
    border-radius: 0 5px 5px 0;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;
  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    text-decoration: none;
    display: block;
    transition: transform 0.2s;

    display: flex;
    align-items: center;

    & + a {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      flex: 1;
      margin: 0 16px;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }

    &:hover {
      transform: translateX(10px);
      svg {
        color: blue;
      }
    }
  }
`;
