import React, { useState } from 'react';
import { CardProps } from "./components/molecules/Card";

import nabe from './images/nabe.jpg'
import './App.css';
import Button from './components/atoms/Button';
import { TaskList } from './components/organisms/TaskList';
import { ModalContainer } from './components/molecules/ModalContainer';
import { Input, InputProps } from './components/atoms/Input';
import { Label } from './components/atoms/Label';
import { TaskText } from './components/atoms/TaskText';


function App() {

  const TaskArray: CardProps[] = [
    {
      taskName: "ごはんつくる",
      taskDescription: "納豆キムチご飯以外で",
      startDate: "08/24/2023 21:19:49",
      dueDate: "08/24/2023 21:19:49"
    },
    {
      taskName: "ご飯食べる",
      taskDescription: "納豆キムチご飯以外で",
      startDate: "08/24/2023 21:19:49",
      dueDate: "08/24/2023 21:19:49"
    },
    {
      taskName: "お皿あらう",
      taskDescription: "納豆キムチご飯以外で",
      startDate: "08/24/2023 21:19:49",
      dueDate: "08/24/2023 21:19:49"
    }
  ]

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState<CardProps>({
    taskName: "",
    taskDescription: "",
    startDate: "",
    dueDate: ""
  })

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = (e:string) => {
    
  }

  return (
    <div className='App'>
      <div className="AppName">煮たりないタスク</div>
      <div>
        <img className="NabeImg" src={nabe} alt="nabe" />
      </div>

          <ModalContainer isOpen={isModalOpen} onClose={closeModal}>
              <Label>たすく</Label>
              <Input type="string" value={inputText.taskName} onChange={handleInputChange} />
        
              <Label>たすくのせつめい</Label>
              <Input type="string" value={inputText.taskDescription} onChange={handleInputChange} />
        
              <Label>煮込みはじめ日</Label>
              <Input type="string" value={inputText.startDate} onChange={handleInputChange} />
        
              <Label>煮込みすぎ日</Label>
              <Input type="string" value={inputText.dueDate} onChange={handleInputChange} />
          </ModalContainer>
          <Button>追加</Button>
          
      <div>
        <TaskList Tasks={TaskArray} />

      </div>
    </div>
  );
}

export default App;
