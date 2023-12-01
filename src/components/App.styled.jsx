import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 800px;
  height: 850px;
  background: transparent;
  border: 2px solid;
  border-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(40px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 350px;
  max-height: 350px;
  padding: 10px;
  background: linear-gradient(rgba(173, 216, 230, 0.5), rgba(173, 216, 230, 0.5));
  
  }
`;
