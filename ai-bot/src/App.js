import {useState} from 'react'

const App = () =>  {
  const [value, setValue]=useState("")
  const [error, setError]=useState("")
  const [chatHistory,setChatHistory]=useState([])
  const surpriseOptions=[
    "Can you tell me a fun fact about space?",
    "Who won the last World Cup?",
    "How do I start learning programming?",
    "What should I have for dinner tonight?"

  ]
  const surprise=() =>{
    const randomValue=surpriseOptions[Math.floor(Math.random()*surpriseOptions.length)]
    setValue(randomValue)

  }
  const getResponse=async()=>{
    if(!value) {
      setError("Error 0_0 Please ask a question!")
      return
    }
    try{
      const options={
        method:'POST',
        body:JSON.stringify({
          history:chatHistory,
          message:value
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }
      const response=await fetch('http://localhost:3000/gemini',options)
      const data=await response.text()
      console.log(data)
      setChatHistory(oldChatHistory=>[...oldChatHistory,{
        role:"user",
        parts:value

      },
      {
        role:"model",
        parts:data
      }
    ])
    setValue("")
      

    } catch(error){
      console.error(error)
      setError("Something went wrong :( Please try again later")

    }

  }
  const clear=()=>{
    setValue("")
    setError("")
    setChatHistory([])
  }


  return (
    
      <div className="app">
        <p>What do you want to know?
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise me! </button>
        </p>
        <div className="input-container">
          <input
          value={value} placeholder="What day is it today?"
          onChange={(e)=>setValue(e.target.value)}  />
          {!error &&<button onClick={getResponse}>Ask me</button>} 
          {error &&<button onClick={clear}>Clear </button> }
        </div>
        {error && <p>{error}</p>}
        <div className="search-result">
          {chatHistory.map((chatItem,_index)=><div key={""}>
            <p className='answer'>{chatItem.role}:{chatItem.parts}</p>
          </div>)}

        </div>

      </div>
      
    
  )
}

export default App;
