import { useRef, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

// Início styled-components

const FormSt = styled.form`
  display: flex;
  margin: 20px;
`;

const LabelSt = styled.label`
  font-size: 1em;
  text-align: center;
  color: black;
`;

const InputSt = styled.input`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid var(--input-outline);
  border-radius: 3px;
  width: 220px;
`;

const ButtonSt = styled.button`
  font-size: 1em;
  cursor: pointer;
  text-align: center;
  color: black;
  width: 120px;
  border-radius: 10px;
  transition: 0.2s;
  &:hover {
    background-color: black;
    color: white;
  }
`;
// Fim styled-components

const Form = ({ puxarLembrete, edit, setEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (edit) {
      const user = ref.current;

      const editDataFormatada = new Date(edit.data).toISOString().split("T")[0];

      user.lembreteTexto.value = edit.lembrete;
      user.lembreteData.value = editDataFormatada;
    }
  }, [edit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // utilização do ref para pegar campos do usuário
    const user = ref.current;

    // Validação dos inputs pelo próprio browser
    if (user.lembreteTexto.value === "" || user.lembreteData.value === "") {
      return window.alert("Preencha todos os campos!");
    } else {
      // Validação data futura, diferença entre data do lembrete x data atual
      const dataAtual = new Date();
      const dataUsuario = new Date(user.lembreteData.value);

      if (dataUsuario <= dataAtual) {
        window.alert("Por favor, escolha uma data futura!");
        return;
      }
    }

    if (edit) {
      await axios.put("http://localhost:8800/" + edit.id, {
        lembrete: user.lembreteTexto.value,
        data: user.lembreteData.value,
      });
    } else {
      // Método de criação de lembretes recendo os valores do input, com o id de cada lembrete sendo gerado pelo uuid
      await axios.post("http://localhost:8800", {
        lembrete: user.lembreteTexto.value,
        data: user.lembreteData.value,
        id: uuidv4(),
      });
    }

    // Apaga os dados do campo após criar
    user.lembreteTexto.value = "";
    user.lembreteData.value = "";

    // Execução do get de lembretes
    puxarLembrete();
    setEdit(null);
  };

  return (
    <>
      <h1>Galeria de lembretes!</h1>
      <FormSt ref={ref} onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="textolembrete">Nome do lembrete:</label>
          <InputSt type="text" placeholder="Ir ao mercado..." name="lembreteTexto" />
        </div>
        <div className="field">
          <LabelSt>Data do lembrete:</LabelSt>
          <InputSt type="date" name="lembreteData" />
        </div>
        <ButtonSt>Cadastrar</ButtonSt>
      </FormSt>
    </>
  );
};

export default Form;
