import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './components/molecules/Modal.css'
import nabe from './images/nabe.jpg'
import liff from '@line/liff'

import Button from './components/atoms/Button';


import { TaskNameList } from './components/organisms/TaskNameList';

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
  limitDate: string; 
  createdAt: string;
};


function App(): JSX.Element {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [inputText, setInputText] = useState<DescriptionProps>({
    accessToken: "",
    title: "",
    description: "",
    startDate: "",
    limitDate: "",
    createdAt: ""
  })


  useEffect(() => {
    liff.init({liffId: '2000520603-Nnz176bY'})
      .then(() =>{
        if (liff.isLoggedIn()){
          handleLoggedIn()
        } else {
          handleNotLoggedIn()
        }
      })
      .catch((error) => {
        alert('LIFF initialization failed:'+ error);
      })
  },[])

  const handleLoggedIn = async () =>{
    const idToken = await liff.getIDToken();
    alert('ID Token '+ idToken)

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



  const openFormModal = () => {
    setIsFormModalOpen(true)
  }
  const closeFormModal = () => {
    setIsFormModalOpen(false)
  }

  const handleInputChange = (input: keyof DescriptionProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText({
      ...inputText, [input]: e.target.value ,
    })
  }

  const getCurrentDateTime = () =>{
    const date = new Date()
    const formattedDate = date.toISOString();
    console.log(formattedDate)
    const newCreatedAtInputText = {
      ...inputText,
      createdAt: formattedDate
    }
    setInputText(newCreatedAtInputText)
  }

  const convertToISOFormat = (formattedDate: string): string => {
    const [datePart, timePart] = formattedDate.split(",");
    const [year, month, day] = datePart.split("/");
  
    const [hours, minutes] = timePart.split(":");
    const isoDate = `${year}-${month}-${day}T${hours}:${minutes}:00.000000`;
  
    return isoDate;
  };
  
  const convertDateToISOString = () => {
    try{
      const newStartDate = convertToISOFormat(inputText.startDate)
      const newLimitDate = convertToISOFormat(inputText.limitDate)
      
      if(newStartDate === null || newLimitDate === null){
        alert("Date conversion failed for at least one date.")
      }
      
      const newSettingDateInputText = {
        ...inputText,
        newStartDate,
        newLimitDate
      }

      setInputText(newSettingDateInputText);
    } catch(error) {
      alert("An error occurred"+ error)
    }
  } 
  

  const handleSubmit = () => {
    getCurrentDateTime()
    convertDateToISOString()

    if(!inputText.title || !inputText.startDate || !inputText.limitDate){
      alert('必須項目を入力してください')
    }
    
    try{
      axios.post('https://nitaricupbackendserver.azurewebsites.net/api/TaskScheme', inputText)
        .then(res => {
          alert('Success:'+ res.data);
        })
        .catch(error =>{
          alert(error)
          alert('An error occurred: ' + error.message);
        })
    } catch(error) {
      alert(error)
    }
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
          <Button className = "" onClick={openFormModal}>追加</Button>
          
          <ModalContainer isOpen={isFormModalOpen} onClose={closeFormModal}>
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
                <Label>(例: 2023/9/20,12:10)</Label>
                <br/>
              </div>

              <div className='form-flex'>
                <Label>煮込みすぎ日</Label>
                <Input type="string" value={inputText.limitDate} onChange={handleInputChange('limitDate')} />
                <Label>(例: 2023/9/22,21:10)</Label>
              </div>
              <div>
                <Button type='submit' onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          </ModalContainer>
      <div>
        <TaskNameList taskNames={TaskArray}/>
        <TaskList Tasks={TaskArray} />

      </div>
    </div>
  );
}

export default App;
