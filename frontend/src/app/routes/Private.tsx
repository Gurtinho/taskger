import { Navigate } from 'react-router-dom';
import { useAuth } from '../shared/contexts/AuthContext';

const Private: React.FC<{ element: JSX.Element }> = ({ element: Element }) => {
    const { verifyToken } = useAuth();
    return verifyToken() ? Element : <Navigate to='/signin' />
};

export { Private };