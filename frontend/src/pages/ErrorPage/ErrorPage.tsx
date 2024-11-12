import PackSimulator from '../PackSimulator/PackSimulator';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/', { replace: true });
  });
  return <PackSimulator />;
}
