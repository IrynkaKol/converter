import styled from 'styled-components';

export const Group = styled.div`
  width: 400px;
  margin: 0 auto 20px;
  display: grid;
  grid-template-columns: 250px 150px;
  border-radius: 15px;
  border: 1px solid black;
`;

export const Input = styled.input`
  background: none;
  border: 0;
  border-radius: 15px;
  font-size: 1.5rem;
  padding-left: 10px;
  color: #fff;
`;

export const Select = styled.select`
  background: none;
  border: 0;
  font-size: 1rem;
  padding: 15px;
  width: 150px;

  color: #fff;
  & option {
    background-color: #1e90ff;
    color: #000000;
  }
`;
