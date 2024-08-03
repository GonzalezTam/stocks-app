import { useParams } from 'react-router-dom';

const StockPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Stock {id} Page</h1>
    </div>
  );
};

export default StockPage;
