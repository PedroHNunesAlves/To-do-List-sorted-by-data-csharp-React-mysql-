import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import axios from "axios";
import LembretesTable from "./components/LembretesTable";

function App() {
  // UseState para guardar os lembretes
  const [lembretes, setLembretes] = useState([]);
  const [edit, setEdit] = useState(null);

  // Função assíncrona de get dos dados no bd utilizando axios
  const puxarLembrete = async () => {
    try {
      const res = await axios.get("http://localhost:8800/");
      // Após puxado, ordenação dos mesmos pela data
      const lembretesOrdenados = res.data.sort(ComparacaoData);
      // Atualiza o setLembretes, consequentemente, lembretes
      setLembretes(lembretesOrdenados);
    } catch (error) {
      // Caso erro, dispara no console
      console.log("Erro GET", error);
    }
  };

  // UseEffect feito para se puxar uma vez a função de get dos lembretes
  useEffect(() => {
    puxarLembrete();
  }, []);

  const ComparacaoData = (a, b) => {
    const dateA = new Date(parseInt(a.dataFormatada.split("/")[2]), parseInt(a.dataFormatada.split("/")[1]) - 1, parseInt(a.dataFormatada.split("/")[0]));

    const dateB = new Date(parseInt(b.dataFormatada.split("/")[2]), parseInt(b.dataFormatada.split("/")[1]) - 1, parseInt(b.dataFormatada.split("/")[0]));

    return dateB - dateA;

    // Converte as datas para o mesmo formato e faz sua subtração (ordenamento "decrescente")
  };

  return (
    <>
      {/* FORM para o campo de inclusão de novos lembretes e LembretesTable para imprimir os dados no browser */}
      <Form setLembretes={setLembretes} puxarLembrete={puxarLembrete} edit={edit} setEdit={setEdit} />
      <LembretesTable setLembretes={setLembretes} lembretes={lembretes} edit={edit} setEdit={setEdit} />
    </>
  );
}

export default App;
