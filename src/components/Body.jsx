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
  


  console.log(pergunta)

  const ler = (response) => {
    const palavras = response.split('.');
  
    for (let i = 0; i < palavras.length; i++ ) {
      let talk = new SpeechSynthesisUtterance(palavras[i]);
      let voices = window.speechSynthesis.getVoices();
      talk.voice = voices[1];
      window.speechSynthesis.speak(talk);
    }
  };
  


  const apiKey = process.env.REACT_APP_OPENAI_API_KEY
 
  const client =axios.create({headers: {Authorization: `Bearer ${apiKey}` }})

const gerarImagem = () => {
  const params = {
    prompt: "um conto de fadas"
  }

  client.post("https://api.openai.com/v1/images/generations", params)
  .then((response)=> console.log(response))
    .catch((err)=> console.log(err))
}
  

const criarHist = () => {
  const params = {
    model: "gpt-4-0613",
    prompt: `Crie uma história completa infantil,  com seguintes caracteristicas, em português:Personagens principais: ${pergunta.principais},personagens secundários:  ${pergunta.secundarios}
    , vilões:  ${pergunta.viloes}, gênero: ${pergunta.generos}, e os elementos ${pergunta.elementos}, divida as frases com um ponto simples como . `, 
    max_tokens: 1500,
    temperature: 1,
    }
    console.log(params.prompt)
    client.post("https://api.openai.com/v1/chat/completions", params)
    .then((result)=> setResponse(result.data.choices[0].text))
    .catch((err)=> console.log(err))
  } 
  
  
  return (
    <div className="container">
      <div  className="secundario"> <h1>Contador de Histórias</h1></div>
      <div className="secundario"><p>Personagem principal</p></div>
      <div className="secundario"><input type="text" value={pergunta.principais} placeholder="Digite todos os personagens principais" onChange={(e) => setPergunta({ ...pergunta, principais: e.target.value })}></input></div>
      <div className="secundario"><p>Personagens secundários</p></div>
      <div className="secundario"><input type="text" value={pergunta.secundarios} placeholder="Digite os personnagens secundários" onChange={(e) => setPergunta({...pergunta, secundarios:e.target.value})}></input></div>
      <div className="secundario"><p>Vilões</p></div>
      <div className="secundario"><input value={pergunta.viloes}  type="text" placeholder="Digite os Vilões da História" onChange={(e) => setPergunta({...pergunta, viloes:e.target.value}) }></input></div>
      <div className="secundario"><p>Gênero</p></div>
      <div className="secundario"><input  value={pergunta.generos} type="text" placeholder="Digite os Gêneros" onChange={(e) => setPergunta({...pergunta, generos:e.target.value}) }></input></div>
      <div className="secundario"><p>Elementos</p></div>
      <div className="secundario"><input value={pergunta.elementos} type="text" placeholder=" Digite os elementos da História" onChange={(e) => setPergunta({...pergunta, elementos:e.target.value}) } ></input></div>
      <div className="secundario"><button onClick={criarHist} >Gerar História</button></div>
      <div className="secundario"><button onClick={() => ler(response)} >ler</button></div>
      <div className="secundario"><button onClick={() => gerarImagem()} >Gerar imagem da história</button></div>
      <div className="secundario"><textarea value={response} readOnly></textarea></div>
      
      
    </div>
  );
  }

export default Body;
