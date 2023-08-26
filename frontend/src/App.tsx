import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './components/molecules/Modal.css'
import nabe from './images/nabe.jpg'
import liff from '@line/liff'

import Button from './components/atoms/Button';
import { Input } from './components/atoms/Input';
import { Label } from './components/atoms/Label';
import { ModalContainer } from './components/molecules/ModalContainer';
import { TaskList } from './components/organisms/TaskList';
import Slideshow from './components/molecules/Slideshow';

export type InputValueProps = {
  title: string;
  description: string;
  startDate: string;
  limitDate: string; // 08/24/2023 21:19:49 yyyy-mm-dd
};

export type DescriptionProps = {
  accessToken: string | null;
  title: string;
  description: string;
  startDate: string;
  limitDate: string; // 08/24/2023 21:19:49 yyyy-mm-dd
  createdAt: string;
};


function App(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState<DescriptionProps>({
    accessToken: "",
    title: "",
    description: "",
    startDate: "",
    limitDate: "",
    createdAt: ""
  })


  useEffect(() => {
    liff.init({liffId: 'YOUR_LIFF_ID'})
      .then(() =>{
        if (liff.isLoggedIn()){
          handleLoggedIn()
        } else {
          handleNotLoggedIn()
        }
      })
      .catch((error) => {
        console.error('LIFF initialization failed:', error);
      })
  },[])

  const handleLoggedIn = async () =>{
    const idToken = await liff.getIDToken();
    console.log('ID Token', idToken)

    const newAccessInputText = {
      ...inputText,
      accessToken: idToken
    }
    setInputText(newAccessInputText)
  }

  const handleNotLoggedIn = async () =>{
    console.log("not logged in")
  }

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



  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = (input: keyof DescriptionProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText({
      ...inputText, [input]: e.target.value ,
    })
  }

  const getCurrentDateTime = () =>{
    const date = new Date()
    const formattedDate = date.toISOString();
    const newCreatedAtInputText = {
      ...inputText,
      createdAt: formattedDate 
    }
    setInputText(newCreatedAtInputText)
  }

  const convertToISOString = (input: string):string | null => {
    const dateRegex = /^(\d{4})\/(\d{1,2})\/(\d{1,2}),(\d{1,2}):(\d{1,2})$/;
    const match = input.match(dateRegex);

    if (match) {
      const year = parseInt(match[1]);
      const month = parseInt(match[2]) - 1; // JavaScriptのDateでは0から11で月を表現
      const day = parseInt(match[3]);
      const hour = parseInt(match[4]);
      const minute = parseInt(match[5]);

      const convertedDate = new Date(year, month, day, hour, minute, 0);
      return convertedDate.toISOString();
    } else {
      return null;
    }
  }

  const convertDateToISOString = () => {
    const newStartDate = convertToISOString(inputText.startDate)
    const newLimitDate = convertToISOString(inputText.limitDate)
    const newSettingDateInputText = {
      ...inputText,
      newStartDate,
      newLimitDate
    }
    setInputText(newSettingDateInputText)
  }

  const handleSubmit = () => {
    getCurrentDateTime()
    convertDateToISOString()

    axios.post('https://nitaricupbackendserver.azurewebsites.net/api/TaskScheme', inputText)
    // if(inputText.accessToken)
    //   localStorage.setItem("submitInfo",inputText.accessToken)
    // localStorage.setItem("submitInfo",inputText.title)

    setInputText({
      ...inputText,
      title: "",
      description: "",
      startDate: "",
      limitDate: "",
      createdAt: ""
    })
  }
  const images = [
    "image1.png",
    "image2.png",
    "image3.png"
  ];

  return (
    <div className='App'>
      <h1 className='AppName'>煮たりないたすく</h1>
        <div className='absolute'>
          <Slideshow images={images} />
        </div>
        <div>
          <img className="NabeImg" src={nabe} alt="nabe" />
        </div>
          <Button className = "" onClick={openModal}>追加</Button>
          
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
              <Label>(例: 2022/8/21,21:10)</Label>
              <br/>
            </div>

            <div className='form-flex'>
              <Label>煮込みすぎ日</Label>
              <Input type="string" value={inputText.limitDate} onChange={handleInputChange('limitDate')} />
              <Label>(例: 2022/8/21,21:10)</Label>
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
