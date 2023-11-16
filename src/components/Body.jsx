import React, { useState } from "react";

import axios from "axios";



function Body() {
  const [response, setResponse] = useState("");
  const [pergunta, setPergunta] =useState({
    principais: "",
    secundarios: "",
    viloes: "",
    generos: "",
    elementos:"",
  });



  const apiKey = process.env.REACT_APP_OPENAI_API_KEY
 
  const client =axios.create({headers: {Authorization: `Bearer ${apiKey}` }})

const criarHist = () => {
  const params = {
    model: "gpt-3.5-turbo-instruct",
    prompt: `Crie uma história completa infantil,  com seguintes caracteristicas, em português:  ${pergunta}`,
    max_tokens: 1500,
    temperature: 1,
    }
    client.post("https://api.openai.com/v1/completions", params)
    .then((result)=> setResponse(result.data.choices[0].text))
    .catch((err)=> console.log(err))
  } 
  


  return (
    <div className="container">
      <h1>Contador de Histórias</h1>
      <p>Personagem principal</p>
      <input type="text" value={pergunta.principais} placeholder="Digite todos os personagens principais" onChange={(e) => setPergunta({ ...pergunta, principais: e.target.value })}></input>
      <p>Personagens secundários</p>
      <input type="text" value={pergunta.secundarios} placeholder="Digite os personnagens secundários" onChange={(e) => setPergunta({...pergunta, secundarios:e.target.value})}></input>
      <p>Vilões</p>
      <input value={pergunta.viloes}  type="text" placeholder="Digite os Vilões da História" onChange={(e) => setPergunta({...pergunta, viloes:e.target.value}) }></input>
      <p>Gênero</p>
      <input  value={pergunta.generos} type="text" placeholder="Digite os Gêneros" onChange={(e) => setPergunta({...pergunta, generos:e.target.value}) }></input>
      <p>Elementos</p>
      <input value={pergunta.elementos} type="text" placeholder=" Digite os elementos da História" onChange={(e) => setPergunta({...pergunta, elementos:e.target.value}) } ></input>
      <br />
      <button onClick={criarHist} >Gerar História</button>
      <br />
      <textarea value={response} readOnly></textarea>
    </div>
  );
}

export default Body;
