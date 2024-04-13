import React from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import App from '../App';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
   
    // Navigate to home page
    this.props.navigate('/');
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
     this.props.navigate('/');
    }

    return this.props.children;
  }
}

// Wrap ErrorBoundary to use useNavigate hook
function withRouter(Component) {
  return props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withRouter(ErrorBoundary);
