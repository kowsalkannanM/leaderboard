import React, { useState, useEffect, useCallback } from 'react';
import jsonData from '../json/data.tsx';
import { BasicCard, Content, ImgDiv, ContentBody, ScoreDiv } from '../styledComponent/index.tsx';

interface DataItem {
  picture: string;
  displayName: string;
  score: number;
  position: number; // Added position property
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataItem[]>(jsonData.map((item) => ({ ...item, position: 0 }))); // Initialize positions to 0

  // Update scores and positions randomly, sort data, and animate rows
  const updateScores = useCallback(() => {
    const updatedData = [...data];

    for (const participant of updatedData) {
      participant.score += Math.floor(Math.random() * 1000) + 1; // Random score change
    }

    // Sort data based on score
    updatedData.sort((a, b) => b.score - a.score);

    // Update positions based on new order
    for (let i = 0; i < updatedData.length; i++) {
      updatedData[i].position = i + 1;
    }

    setData(updatedData);

    // Animate rows based on position changes
    const contentElements = document.getElementsByClassName('Content');
    for (let i = 0; i < contentElements.length; i++) {
      const oldPosition = data[i].position;
      const newPosition = updatedData[i].position;

      const contentElement = contentElements[i] as HTMLElement;
      if (newPosition > oldPosition) {
        contentElement.classList.add('moved-up');
      } else if (newPosition < oldPosition) {
        contentElement.classList.add('moved-down');
      }

      // Remove animation classes after transitions
      setTimeout(() => {
        contentElement.classList.remove('moved-up');
        contentElement.classList.remove('moved-down');
      }, 500);
    }
  },[data]);

  // Set up interval to update scores and animate rows every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateScores();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [updateScores]);

  return (
    <BasicCard>
      {data.map((dataItem, key) => (
        <Content key={key} className='Content'>
          <ContentBody>
            <ImgDiv>
              <div className={`serial ${key === 0 ? 'red' : (key === 1 ? 'yellow' : (key === 2 ? 'orange' : 'blue'))}`}>
                {key + 1}
              </div>
              <div className="circle-img">
                {dataItem.picture && <img src={dataItem.picture} alt={dataItem.displayName} />}
              </div>
              <div>{dataItem.displayName}</div>
            </ImgDiv>
            <ScoreDiv>{`${dataItem.score}pt`}</ScoreDiv>
          </ContentBody>
        </Content>
      ))}
    </BasicCard>
  );
};

export default Dashboard;