import React, { useState, useEffect } from 'react'
import './Character.scss'
import { useParams } from 'react-router-dom'
import axios from './axios';

function Character() {
  const { id } = useParams();
  const [char, setchar] = useState([])
  const [quotes, setquotes] = useState([])

  useEffect(() => {
    axios.get(`/characters/${id}`)
      .then(res => {
        console.log("data: ", res.data[0])
        setchar(res.data[0])

        axios.get(`/quote?author=${res.data[0].name}`)
          .then(resp => {
            setquotes(resp.data)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => console.log(err))
  }, [])

  const DisplayQuotes = () => {
    if (quotes?.length !== 0) {
      return (
        <>
          <h3>Quotes:</h3>
          {
            quotes?.map((quote, j) => (
              <div key={j}>{j + 1}. {quote.quote}</div>
            ))
          }
        </>
      )
    }
    else {
      return null
    }
  }

  return (
    <div className="characterPage">
      <div className="details">

        <h1>{char?.name} ({char?.nickname})</h1>
        <h3>DOB:</h3>
        <div>{char?.birthday}</div>
        <h3>Occupation:</h3>
        <div>{char?.occupation?.map((item, i) => (
          <div key={i}>{char?.occupation.length !== 1 && `${i + 1}. `}{item}</div>
        ))}
        </div>
        <h3>Status:</h3>
        <div>{char?.status}</div>
        <h3>Portrayed by:</h3>
        <div>{char?.portrayed}</div>
        {char?.appearance?.length > 0 &&
          (
            <>
              <h3>Seasons:</h3>
              <div>{char?.appearance?.map((item, k) => (
                <span key={k}>{item}{k !== char.appearance.length - 1 && ", "}</span>
              ))}</div>
            </>
          )
        }
        <DisplayQuotes />

      </div>
      <div>
        <h1>&nbsp;</h1>
        <img src={char?.img} alt="character" />
      </div>
    </div>
  )
}

export default Character
