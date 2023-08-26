import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './components/molecules/Modal.css'
import nabe from './images/nabe.jpg'

import Button from './components/atoms/Button';
import { Input } from './components/atoms/Input';
import { Label } from './components/atoms/Label';
import { ModalContainer } from './components/molecules/ModalContainer';
import { TaskList } from './components/organisms/TaskList';

export type InputValueProps = {
  title: string;
  description: string;
  startDate: string;
  limitDate: string; // 08/24/2023 21:19:49 yyyy-mm-dd
};

export type DescriptionProps = {
  accesstoken: string;
  title: string;
  description: string;
  startDate: string;
  limitDate: string; // 08/24/2023 21:19:49 yyyy-mm-dd
  createdAt: string;
};

function App() {

  const TaskArray: InputValueProps[] = [
    {
      title: "ごはんつくる",
      description: "納豆キムチご飯以外で",
      startDate: "08/24/2023 21:19:49",
      limitDate: "08/24/2023 21:19:49"
    },
    {
      title: "ご飯食べる",
      description: "納豆キムチご飯以外で",
      startDate: "08/24/2023 21:19:49",
      limitDate: "08/24/2023 21:19:49"
    },
    {
      title: "お皿あらう",
      description: "納豆キムチご飯以外で",
      startDate: "08/24/2023 21:19:49",
      limitDate: "08/24/2023 21:19:49"
    }
  ]

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState<InputValueProps>({
    title: "",
    description: "",
    startDate: "",
    limitDate: ""
  })

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = (input: keyof InputValueProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText({
      ...inputText, [input]: e.target.value ,
    })
  }

  const handleSubmit = () => {
    axios.post('https://nitaricupbackendserver.azurewebsites.net/api/TaskScheme', inputText)
    setInputText({
      ...inputText,
      title: "",
      description: "",
      startDate: "",
      limitDate: ""
    })
  }

  return (
    <div className='App'>
      <div className="AppName">煮たりないタスク</div>
      <div>
        <img className="NabeImg" src={nabe} alt="nabe" />
      </div>

          <Button onClick={openModal}>追加</Button>
          
          <ModalContainer isOpen={isModalOpen} onClose={closeModal}>
          <div className="modal-flex">  
            <div className='form-flex'>
              <Label>たすく</Label>
              <Input type="string" value={inputText.title} onChange={handleInputChange('title')} />
              <br/>
            </div>

            <div className='form-flex'>
              <Label>たすくのせつめい</Label>
              <Input type="string" value={inputText.description} onChange={handleInputChange('description')} />
              <br/>
            </div>

            <div className='form-flex'>
              <Label>煮込みはじめ日</Label>
              <Input type="string" value={inputText.startDate} onChange={handleInputChange('startDate')} />
              <br/>
            </div>

            <div className='form-flex'>
              <Label>煮込みすぎ日</Label>
              <Input type="string" value={inputText.limitDate} onChange={handleInputChange('limitDate')} />
            </div>
            <div>
              <Button type='submit' onClick={handleSubmit}>Submit</Button>
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
