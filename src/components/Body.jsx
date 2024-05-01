import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
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
  const [imagem, setImagem] = useState("")
  const [idioma,setIdioma]  = useState("")
  const [textoHist, setTextoHist] = useState("")


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
      model: "dall-e-3",
      prompt:`gere uma história em quadrinhos em uma imagem vertical, pensando na exibição em um celular que com os acontecimentos da história contida em ${response}  `,
      n: 1,
      size: "1024x1792",
    };

    client.post("https://api.openai.com/v1/images/generations", imagemParams)
      .then((result) => {
        console.log(result)
        setImagem(result.data.data[0].url)
      })
      .catch((err) => console.log(err));
  };

      useEffect(()=>{
        if(imagem !== "") {
          const espacoImagem = document.getElementById('imagemHistoria')
          espacoImagem.innerHTML= " "
         
          const imagemGerada = document.createElement('img')
          imagemGerada.src = imagem

          document.getElementById('imagemHistoria').appendChild(imagemGerada)
        }
    },[imagem] );


  const criarHist = () => {
    const params = {
      model: "gpt-4",
      messages: [
        { role: "system", content: "Você é um especialista em  criar histórias para crianças" },
        { role: "user", content: `Crie uma história completa infantil, com as seguintes características em português: Personagens principais: 
        ${pergunta.principais}, personagens secundários: ${pergunta.secundarios}, vilões: ${pergunta.viloes}, gênero: ${pergunta.generos}, e os elementos: ${pergunta.elementos}. Divida as frases com um ponto simples como .` },
      ],
      max_tokens: 1500,
      temperature: 1,
    };
  
    console.log(params.messages[1].content);
  
    client.post("https://api.openai.com/v1/chat/completions", params)
      .then((result) => setResponse(result.data.choices[0].message.content))
      .catch((err) => console.log(err));

      
  };
  useEffect(() => {
    // Verificar se a resposta mudou
    if (response !== textoHist) {
      // Atualizar o textoHist
      setTextoHist(response);

      // Limpar o conteúdo anterior
      const espacoHistoria = document.getElementById("espacoHistoria");
      espacoHistoria.innerHTML = "";

      // Criar um novo parágrafo com o texto atualizado e adicioná-lo ao DOM
      const textoHistoria = document.createElement('p');
      textoHistoria.textContent = response;
      espacoHistoria.appendChild(textoHistoria);
    }
  }, [response]); 

  
  return (
   <div className="container-sm" id="principal">
       <header>  <h1>Contador de Histórias</h1></header>
    
    <div className="inputform">
    <p>Personagem principal</p>
      <input className="form-control"  type="text" value={pergunta.principais} placeholder="Digite todos os personagens principais"
       onChange={(e) =>
         setPergunta({ ...pergunta, principais: e.target.value })}></input>
    </div>
      
    <div className="inputform">
    <p>Personagens secundários</p>
      <input className="form-control" type="text" value={pergunta.secundarios} 
       placeholder="Digite os personnagens secundários" onChange={(e) =>
         setPergunta({...pergunta, secundarios:e.target.value})}></input>
    </div>
      
    <div className="inputform">

    <p>Vilões</p>
      <input className="form-control" value={pergunta.viloes}  type="text" 
      placeholder="Digite os Vilões da História" onChange={(e) => 
        setPergunta({...pergunta, viloes:e.target.value}) }></input>
    </div>
    <div className="inputform">

    <p>Gênero</p>
      <input className="form-control" value={pergunta.generos} type="text"
       placeholder="Digite os Gêneros" onChange={(e) =>
         setPergunta({...pergunta, generos:e.target.value}) }></input>
    </div>


    <div className="inputform">
    <p >Elementos</p>
      <input className="form-control" value={pergunta.elementos} type="text" 
      placeholder=" Digite os elementos da História" onChange={(e) => 
        setPergunta({...pergunta, elementos:e.target.value}) } ></input>
    </div>


    <div id="botoes">
    <div className="btn-group" role="group" aria-label="Basic example">
    <button className="btn btn-primary" onClick={criarHist} >Gerar História</button>
    <button className="btn btn-primary" onClick={() => ler(response)} >ler</button>
    <button className="btn btn-primary" onClick={() =>gerarImagem()} >Gerar imagem da história</button>
    </div>
    </div>
    


      
      <div id="espacoHistoria"></div>
      
     
      
      <div id="imagemHistoria"></div>
      

     {/*} <img src={imagem} alt="imagem gerada" />*/}
      
      
    </div>
  );
  }

export default Body;