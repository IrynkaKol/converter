import styled from 'styled-components';

export const Wrapp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.5rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 20px;
    
  }
`;

export const HeaderTitle = styled.h1`
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 18px;
  }

`;
