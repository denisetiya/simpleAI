import {useState} from 'react'
import { Navbar, Spinner,Textarea, Avatar } from "@material-tailwind/react";
import { motion } from "framer-motion"
import { NavbarCom } from '../components/NavbarCom';
import { PaperPlaneRight, AndroidLogo } from "@phosphor-icons/react";
import pp from '../assets/pp.png'
import axios from 'axios';

function home() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState('')
  const [showPicture, setShowPicture] = useState(false)

  const handleSend = async () => {
    setShow(message);
    setShowPicture(true);
    setLoading(true);
  
    try {
      const res = await axios.post('https://lively-stockings-dove.cyclic.app/', {
        message,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
  
      const { data } = res;
      setResponse(data.response);
    } catch (err) {
      console.log(err);
    }
  
    setLoading(false);
    setMessage("");
  };

  return (
    <div  className="mx-auto max-w-screen-xl px-6 py-3">
     
      <NavbarCom/>
      <div className='flex items-center justify-center'>
        <div className='flex flex-col justify-center items-center align-middle gap-5 mb-20'>
          <div

          className='mt-14 flex flex-col w-full gap-7'>
            <motion.div
              className='flex w-full gap-2'
              initial={{opacity: 0, x: -25}}
              animate={{opacity: 1, x: 0}}
              transition={{
                duration: 1,
              }}
            >
              <AndroidLogo size={25} />
              <p className='border-2 shadow-xl px-4 py-2 rounded-lg font-serif text-sm'>
                Halo ada yang bisa saya bantu ?
              </p>
            </motion.div>
            <div 
              className='flex gap-1 justify-end items-end w-full text-end'>
              <motion.p
                initial={{opacity: 0, x: 25}}
                animate={{opacity: 1, x: 0}}
                transition={{
                  duration: 1,
                }}
                className='border-2 shadow-xl px-4 py-2 rounded-lg font-serif text-sm'
              >
                {show}
              </motion.p>
              {
                showPicture ? 
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <Avatar
                    variant="circular"
                    className="border-2 border-white hover:z-10 focus:z-10 w-8 h-8"
                    src={pp}
                  />
                </motion.div>
                : null
              }
   
            </div>
            <div className='flex w-full'>  
              { 
                loading ? 
                <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                  duration: 0.5,
                }}
                className='flex w-full justify-center items-center align-middle'
                >
                <Spinner color='green' />
                </motion.div> 
                : <motion.div 
                  initial={{opacity: 0,scale: 0.7, x: -25}}
                  animate={{opacity: 1,scale: 1, x: 0}}
                  transition={{
                    duration: 2,
                    delay: 0.5
                  }}
                  className='border-2 shadow-xl px-4 py-2 rounded-lg font-serif text-sm flex wrap'
                >
                  
                  {response}
                </motion.div>
              }
            </div>
          </div>
        </div>
        <motion.div 
        initial={{opacity: 0,x: -25}}
        animate={{opacity: 1,x: 0}}
        transition={{
          duration: 1,
        }}
        className='fixed bottom-0 p-1 border-2 shadow-2xl rounded-xl w-[89%] md:w-[70%] flex justify-between'>
          <Textarea
            rows={1}
            resize={true}
            className="min-h-full !border-0 focus:border-transparent"
            containerProps={{
              className: "grid h-full",
            }}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={message} placeholder="Ask a question" onChange={e => setMessage(e.target.value)}
          />
          <button onClick={handleSend} className='mr-4 flex items-center'><PaperPlaneRight size={25} /></button>
        </motion.div>
      </div>
    </div>
  )
}

export default home
