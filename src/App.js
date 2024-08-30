import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from 'react-router-dom';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const queryClient = new QueryClient();

// Função para obter os IDs válidos da API
const fetchValidIDs = async () => {
  const response = await axios.get('http://localhost:5000/listid'); // Substitua pela URL correta da sua API
  return response.data; // Supondo que a API retorna uma lista de IDs ou outros dados
};

// Função para verificar o status do formulário
const fetchFormStatus = async (id) => {
  const response = await axios.get(`http://localhost:5000/form-status/${id}`);
  return response.data.formExists;
};

function FormularioTecnico() {
  const { id } = useParams();
  const { data: validIDs, isLoading: validIDsLoading, error: validIDsError } = useQuery('validIDs', fetchValidIDs);
  const { data: formExists, isLoading: formStatusLoading, error: formStatusError } = useQuery(['formStatus', id], () => fetchFormStatus(id));
  const [formData, setFormData] = useState({
    nacionalidade: 'nacional',
    tipo: '',
    cpf: '',
    nome: '',
    sexo: '',
    email: '',
    cep: '',
    tipoLogradouro: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    telefone: '',
    descricao: '',
    imagem: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Redireciona para a página de sucesso se o formulário foi enviado
  if (formExists) {
    return <Navigate to="/success" />;
  }

  // Se o ID não for válido, redirecione para uma página de "Acesso Negado"
  if (validIDsLoading || formStatusLoading) return <div>Loading...</div>;
  if (validIDsError || formStatusError) return <div>Erro ao carregar dados</div>;
  if (!validIDs || !validIDs.includes(id)) {
    return <Navigate to="/access-denied" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      imagem: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia os dados do formulário para o backend
      const response = await axios.post(`http://localhost:5000/save-form/${id}`, formData);
      toast.success('Formulário salvo com sucesso');

      // Define a flag no localStorage indicando que o formulário foi enviado
      localStorage.setItem('formStatus', 'submitted');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  // Redireciona para a página de sucesso se o formulário foi enviado
  if (isSubmitted) {
    return <Navigate to="/success" />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Formulario Tecnico</h1>
      </header>
      <main>
        <form className="formulario-tecnico" onSubmit={handleSubmit}>
          {/* Campos do formulário */}
          <div className="form-group">
            <label htmlFor="nacionalidade">Nacionalidade:</label>
            <div className="nacionalidade-group">
              <label>
                <input
                  type="radio"
                  id="nacional"
                  name="nacionalidade"
                  value="nacional"
                  checked={formData.nacionalidade === 'nacional'}
                  onChange={handleChange}
                />
                Nacional
              </label>
              <label>
                <input
                  type="radio"
                  id="estrangeiro"
                  name="nacionalidade"
                  value="estrangeiro"
                  checked={formData.nacionalidade === 'estrangeiro'}
                  onChange={handleChange}
                />
                Estrangeiro
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tipo">Tipo:</label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              placeholder="Digite o tipo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Digite o CPF"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite o nome"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sexo">Sexo:</label>
            <input
              type="text"
              id="sexo"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              placeholder="Digite o sexo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite o email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="Digite o CEP"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipoLogradouro">Tipo de logradouro:</label>
            <input
              type="text"
              id="tipoLogradouro"
              name="tipoLogradouro"
              value={formData.tipoLogradouro}
              onChange={handleChange}
              placeholder="Digite o tipo de logradouro"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="logradouro">Logradouro:</label>
            <input
              type="text"
              id="logradouro"
              name="logradouro"
              value={formData.logradouro}
              onChange={handleChange}
              placeholder="Digite o logradouro"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="numero">Número:</label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              placeholder="Digite o número"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="complemento">Complemento:</label>
            <input
              type="text"
              id="complemento"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
              placeholder="Digite o complemento"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bairro">Bairro:</label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
              placeholder="Digite o bairro"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cidade">Cidade:</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              placeholder="Digite a cidade"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="uf">UF:</label>
            <input
              type="text"
              id="uf"
              name="uf"
              value={formData.uf}
              onChange={handleChange}
              placeholder="Digite o estado (UF)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Digite o telefone"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Digite a descrição"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagem">Imagem:</label>
            <input
              type="file"
              id="imagem"
              name="imagem"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
        <ToastContainer />
      </main>
    </div>
  );
}

function FormularioVisualizacao() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/form/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados do formulário:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!formData) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Dados do Formulário</h1>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}

function SuccessPage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sucesso!</h1>
        <p>Seu formulário foi salvo com sucesso.</p>
      </header>
    </div>
  );
}

function AccessDenied() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Acesso Negado</h1>
        <p>Você não tem permissão para acessar esta página.</p>
      </header>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/view-form/:id" element={<FormularioVisualizacao />} />
          <Route path="/:id" element={<FormularioTecnico />} />
          <Route path="*" element={<Navigate to="/access-denied" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
