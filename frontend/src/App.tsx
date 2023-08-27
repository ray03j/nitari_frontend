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
import { set } from 'date-fns';
import { GetTaskProps } from './types/type';

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
  const [notFinishTask, setNotFinishTask] = useState<GetTaskProps[]>([])

  const [inputText, setInputText] = useState<DescriptionProps>({
    accessToken: "",
    title: "",
    description: "",
    startDate: "",
    limitDate: "",
    createdAt: ""
  })

  const handleLoggedIn = async () =>{
    const idToken = await liff.getIDToken();

    const newAccessInputText = {
      ...inputText,
      accessToken: idToken
    }
    setInputText(newAccessInputText)
  }

  const handleNotLoggedIn = async () =>{
    console.log("not logged in")
  }

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
        console.error('LIFF initialization failed:', error);
      })
    
      const getNotFinish10Tasks = async () => {
        const AccessToken = inputText.accessToken
        try {
          const res = await axios.get('https://nitaricupbackendserver.azurewebsites.net/api/TaskScheme/NotDone/AT='+{AccessToken}+',index={0}')
          setNotFinishTask(res.data)
        } catch (error) {
          console.error('GetNotFinishTasks error occurred', error)
        }
      }

  },[])


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


  const getCurrentDateTime = () => {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(6, "0");
  
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    
    const newCreatedAtInputText = {
      ...inputText,
      createdAt: formattedDateTime,
    }
    alert(newCreatedAtInputText.createdAt)
    
    setInputText(newCreatedAtInputText)
  }


  const convertToISOFormat = (formattedDate: string): string => {
    const [datePart, timePart] = formattedDate.split(",");
    const [year, month, day] = datePart.split("/");
    const [hours, minutes] = timePart.split(":");

    const isoDate = `${year}-${month}-${day}T${hours}:${minutes}:00.000000`;
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}$/
    if(regex.test(isoDate)) return isoDate;
    else {
      alert("Not matched\n")
      return ""
    }
  };
  
  const convertDateToISOString = () => {
    try{
      const newStartDate = convertToISOFormat(inputText.startDate)
      const newLimitDate = convertToISOFormat(inputText.limitDate)
      

      if(newStartDate === "" || newLimitDate === ""){
        alert("Date conversion failed for at least one date.")
        return
      }
      
      const newSettingDateInputText = {
        ...inputText,
        startDate: newStartDate,
        limitDate: newLimitDate
      }
      console.log(newSettingDateInputText)
      setInputText(newSettingDateInputText);
    } catch(error) {

      alert("error: "+ error)

    }
  } 
  
  const publishIdToken = async() => {
    const idToken = await liff.getIDToken();
    const newIdTokenInputText = {
      ...inputText,
      accessToken: idToken
    }
    if(!newIdTokenInputText.accessToken) alert("access token is null") 
    setInputText(newIdTokenInputText)
  }

  const handleSubmit = () => {
    closeFormModal()
    publishIdToken()
    getCurrentDateTime()
    convertDateToISOString()


    try{
      if(!inputText.accessToken) console.log("access token is null")
      axios.post('https://nitaricupbackendserver.azurewebsites.net/api/TaskScheme',inputText)
        .then(res => {
          console.log('Success:'+ res.status);
        })
        .catch((error) =>{
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
                <Label>(例: 2023/09/20,12:10)</Label>
                <br/>
              </div>

              <div className='form-flex'>
                <Label>煮込みすぎ日</Label>
                <Input type="string" value={inputText.limitDate} onChange={handleInputChange('limitDate')} />
                <Label>(例: 2023/09/22,21:10)</Label>
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
