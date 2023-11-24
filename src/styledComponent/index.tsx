
import styled from "styled-components";


const BasicCard = styled.div`
  font-size: 20px;
  :hover {
    color: white;
  }
  width:90%;
  margin:5%;
  background: white;
  border-radius: 10px;

  @media (max-width: 767px) {
    width: 100%;
    margin: 5% auto;
  }`;

const Content = styled.div`
  padding: 10px 20px 10px 20px;
  border-bottom: 1px solid #0000000a; 
  :hover {
    background-color: #0a55c5cc;
  }
  width: 98%;
  @media (max-width: 767px) {
    padding: 20px 10px;
    width: 90%;
  }`;

const ContentBody = styled.div`
display:flex; `;

const ImgDiv = styled.div`
display: flex;
flex-direction: row;
column-gap: 10px;
align-items: center;
width: 90%;

@media (max-width: 767px) {
  align-items: flex-start;
} `

const ScoreDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
color: red;
@media (max-width: 767px) {
  font-size : 16px;
} 
`

export  { BasicCard, Content, ImgDiv, ContentBody, ScoreDiv };