import React, { useState } from "react";

import axios from "axios";



function Body() {
  const [response, setResponse] = useState("");
  const [imagem, setImagem] = useState({
    "created":"" ,
    "data": [
      {
        "url": "data:image/jpeg;base64,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"
      },
      {
        "url": ""
      }
    ]
  });
  const [imagemVisual, setImagemVisual] = useState(imagem.data[0].url)
  const [pergunta, setPergunta] =useState({
    principais: "",
    secundarios: "",
    viloes: "",
    generos: "",
    elementos:"",
  });
  console.log(imagem.data[0].url)


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
    
      const imagemParams = {
      prompt: `um macaco`,
      };

      client.post("https://api.openai.com/v1/images/generations", imagemParams)
      .then((resposta) => {
        setImagem(resposta.data[0])  ;
      
      console.log(imagem[0])

       })
    .catch((err) => console.error(err));
};

const criarHist = () => {
  const params = {
    model: "gpt-3.5-turbo-instruct",
    prompt: `Crie uma história completa infantil,  com seguintes caracteristicas, em português:Personagens principais: ${pergunta.principais},personagens secundários:  ${pergunta.secundarios}
    , vilões:  ${pergunta.viloes}, gênero: ${pergunta.generos}, e os elementos ${pergunta.elementos}, divida as frases com um ponto simples como . `, 
    max_tokens: 1500,
    temperature: 1,
    }
    console.log(params.prompt)
    client.post("https://api.openai.com/v1/completions", params)
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
      <div className="secundario"><img src={imagemVisual} alt="imagem gerada" /></div>
      
    </div>
  );
  }

export default Body;
