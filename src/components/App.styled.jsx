import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  max-width: 550px;
  background: transparent;
  border: 2px solid;
  border-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  margin: 20% auto;

  @media (max-width: 768px) {
  max-width: 300px;
  max-height: 400px;
  padding: 10px;
  background: linear-gradient(#00008B, #0000CD,  #4682B4, #00BFFF);
  
  }
`;
