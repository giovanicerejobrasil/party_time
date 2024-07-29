import partyFetch from "../axios/config";

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import useToast from "../hookies/useToast";

import "./Form.css";

const EditParty = () => {
  const { id } = useParams();

  const [party, setParty] = useState("");
  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get(`/services`);

      setServices(res.data);

      loadParty();
    };

    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);

      setParty(res.data);
    };

    loadServices();
  }, [id]);

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.filter((s) => s._id === value);

    let partyServices = party.services;

    if (checked) {
      partyServices = [...partyServices, filteredService[0]];
    } else {
      partyServices = partyServices.filter((s) => s._id !== value);
    }

    setParty({ ...party, services: partyServices });
  };

  const updateParty = async (e) => {
    e.preventDefault();

    try {
      const res = await partyFetch.put(`/parties/${id}`, party);

      if (res.status === 200) {
        navigate(`/party/${id}`);
        useToast(res.data.message);
      }
    } catch (error) {
      useToast(error.response.data.message, "error");
    }
  };

  if (!party) return <p>Carregando...</p>;

  return (
    <div className="form-page">
      <h2>
        Edite sua festa: <span className="primary-color">{party.title}</span>
      </h2>
      <p>Ajuste as informações da sua festa</p>

      <form onSubmit={(e) => updateParty(e)}>
        <label>
          <span>Nome da festa</span>
          <input
            type="text"
            placeholder="Seja criativo..."
            required
            onChange={(e) => setParty({ ...party, title: e.target.value })}
            value={party.title}
          />
        </label>

        <label>
          <span>Anfitrião</span>
          <input
            type="text"
            placeholder="Quem está dando a festa?"
            required
            onChange={(e) => setParty({ ...party, author: e.target.value })}
            value={party.author}
          />
        </label>

        <label>
          <span>Descrição</span>
          <textarea
            placeholder="Conte mais sobre a festa..."
            required
            onChange={(e) =>
              setParty({ ...party, description: e.target.value })
            }
            value={party.description}
          ></textarea>
        </label>

        <label>
          <span>Orçamento</span>
          <input
            type="number"
            placeholder="Quanto você pretende investir?"
            required
            onChange={(e) => setParty({ ...party, budget: e.target.value })}
            value={party.budget}
          />
        </label>

        <label>
          <span>Imagem</span>
          <input
            type="text"
            placeholder="Insira a url da imagem..."
            required
            onChange={(e) => setParty({ ...party, image: e.target.value })}
            value={party.image}
          />
        </label>

        <label>
          <span>Serviços</span>
          <div className="services-container">
            {services.length === 0 && <p>Carregando...</p>}
            {services.length > 0 &&
              services.map((service) => (
                <div className="service" key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className="service-name">{service.name}</p>
                  <p className="service-price">R$ {service.price}</p>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      value={service._id}
                      onChange={(e) => handleServices(e)}
                      checked={
                        party.services.find(
                          (partyService) => partyService._id === service._id
                        ) || ""
                      }
                    />
                    <p>Solicitar serviço</p>
                  </div>
                </div>
              ))}
          </div>
        </label>

        <input type="submit" value="Atualizar festa" className={"btn"} />
      </form>
    </div>
  );
};

export default EditParty;
