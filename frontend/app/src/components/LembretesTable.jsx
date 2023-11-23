import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { RingLoader } from "react-spinners";

const CampoVazio = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

const LembreteBlock = styled.div`
  background-color: whitesmoke;
  padding: 8px;
  width: 300px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: 20px;
  flex-wrap: wrap;
`;

const LembretesField = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LembretesTable = ({ setLembretes, lembretes, edit, setEdit }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800"); // Ajuste a URL conforme necessário
        const data = response.data;
        setLembretes(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar lembretes:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [setLembretes]);

  const agruparLembretesPelaData = (lembretes) => {
    const lembretesAgrupados = {};

    lembretes.forEach((lembrete) => {
      const dataFormatada = lembrete.dataFormatada;

      if (!lembretesAgrupados[dataFormatada]) {
        lembretesAgrupados[dataFormatada] = [];
      }

      lembretesAgrupados[dataFormatada].push(lembrete);
    });

    return lembretesAgrupados;
  };

  const lembretesAgrupados = agruparLembretesPelaData(lembretes);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/${id}`);
      const newArray = lembretes.filter((lembrete) => lembrete.id !== id);
      setLembretes(newArray);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {loading && (
        <div
          className="loading-container"
          style={{
            position: "absolute",
            marginTop: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <RingLoader loading={loading} size={100} color={"#000"} />
        </div>
      )}
      {!loading && (
        <>
          {lembretes && Object.entries(lembretesAgrupados).length > 0 ? (
            <>
              <h2>Seus Lembretes:</h2>
              {Object.entries(lembretesAgrupados).map(([dataFormatada, lembretesPorData]) => (
                <div key={dataFormatada}>
                  <h2>{dataFormatada}</h2>
                  <LembretesField>
                    {lembretesPorData.map((lembrete, i) => (
                      <LembreteBlock key={i}>
                        <p>{lembrete.lembrete}</p>
                        <FaTrash style={{ cursor: "pointer" }} onClick={() => handleDelete(lembrete.id)} />
                      </LembreteBlock>
                    ))}
                  </LembretesField>
                </div>
              ))}
            </>
          ) : (
            <CampoVazio>
              <h1>A lista está vazia!</h1>
            </CampoVazio>
          )}
        </>
      )}
    </div>
  );
};

export default LembretesTable;
