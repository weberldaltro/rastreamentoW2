import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  width: 100%;

  h1 {
    font-size: 120px;
    color: white;
  }

  span {
    font-size: 20px;
    color: white;
    top: 230px;
    position: absolute;
  }
`;
export const DiretoryDownload = styled.div`
  border: solid 1px white;
  border-radius: 8px;
  width: 35%;

  p {
    display: flex;
    color: white;
    padding-left: 10px;
    word-break: break-all;
  }

  :hover {
    background-color: #ffffff91;
    cursor: pointer;
  }
`;

export const Button = styled.button`
  background-color: #008040;
  width: 300px;
  height: 60px;
  border-radius: 8px;
  border: none;
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  outline: inherit;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  color: white;
`;
