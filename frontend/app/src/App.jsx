import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import axios from "axios";
import LembretesTable from "./components/LembretesTable";

function App() {
  const [lembretes, setLembretes] = useState([]);
  const [edit, setEdit] = useState(null);

  const puxarLembrete = async () => {
    try {
      const res = await axios.get("http://localhost:8800/");
      const lembretesOrdenados = res.data.sort(ComparacaoData);
      setLembretes(lembretesOrdenados);
    } catch (error) {
      console.log("Erro GET", error);
    }
  };

  useEffect(() => {
    puxarLembrete();
  }, []);

  const ComparacaoData = (a, b) => {
    const dateA = new Date(parseInt(a.dataFormatada.split("/")[2]), parseInt(a.dataFormatada.split("/")[1]) - 1, parseInt(a.dataFormatada.split("/")[0]));

    const dateB = new Date(parseInt(b.dataFormatada.split("/")[2]), parseInt(b.dataFormatada.split("/")[1]) - 1, parseInt(b.dataFormatada.split("/")[0]));

    return dateB - dateA;
  };

  return (
    <>
      <Form setLembretes={setLembretes} edit={edit} setEdit={setEdit} puxarLembrete={puxarLembrete} />
      <LembretesTable setLembretes={setLembretes} lembretes={lembretes} setEdit={setEdit} />
    </>
  );
}

export default App;
