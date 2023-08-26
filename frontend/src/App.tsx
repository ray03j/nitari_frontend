import React, { useState } from 'react';
import { CardProps } from "./components/molecules/Card";

import nabe from './images/nabe.jpg'
import './App.css';
import Button from './components/atoms/Button';
import { TaskList } from './components/organisms/TaskList';
import { ModalContainer } from './components/molecules/ModalContainer';
import { Input } from './components/atoms/Input';
import { Label } from './components/atoms/Label';
import './components/molecules/Modal.css'
import Slideshow from './components/molecules/Slideshow';
// import image1 from './images/image1.png'
// import image2 from './images/image2.png'
// import image3 from './images/image3.png'

function App(): JSX.Element {

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const {name, value} = e.target
    // setInputText((prevInputText) => ({
    //   ...prevInputText,
    //   [name]: value,
    // }))
  }
  const images = [
    "image1.png",
    "image2.png",
    "image3.png"
  ];

  return (
    <div className='App'>
      <div className="AppName">煮たりないタスク</div>
      <div>
        <div className='absolute'>
          <Slideshow images={images} />
        </div>
          <img className="NabeImg" src={nabe} alt="nabe" />
        
      </div>

          <Button onClick={openModal}>追加</Button>
          
          <ModalContainer isOpen={isModalOpen} onClose={closeModal}>
          <div className="modal-flex">  
            <div className='form-flex'>
              <Label>たすく</Label>
              <Input type="string" value={inputText.taskName} onChange={(e) => handleInputChange} />
              <br/>
            </div>

            <div className='form-flex'>
              <Label>たすくのせつめい</Label>
              <Input type="string" value={inputText.taskDescription} onChange={(e) => handleInputChange} />
              <br/>
            </div>

            <div className='form-flex'>
              <Label>煮込みはじめ日</Label>
              <Input type="string" value={inputText.startDate} onChange={(e) => handleInputChange} />
              <br/>
            </div>

            <div className='form-flex'>
              <Label>煮込みすぎ日</Label>
              <Input type="string" value={inputText.dueDate} onChange={(e) => handleInputChange} />
            </div>
          </div>

          </ModalContainer>
      <div>
        <TaskList Tasks={TaskArray} />

      </div>
    </div>
  );
}

export default App;
