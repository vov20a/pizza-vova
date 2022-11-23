import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://62c2e7f4876c4700f531e25f.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (event) {
        const _event = event as Error
        alert(_event.message);
        navigate('/');
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="container">
      <div className="pizza-block">
        <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{pizza.title}</h4>
        <div className="pizza-block__price">от {pizza.price} ₽</div>
      </div>
    </div>
  );
};

export default FullPizza;
