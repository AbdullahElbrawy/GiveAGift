import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from './error'; // Adjust the import path as needed

// This wrapper component enables the use of hooks with your class component
function ErrorBoundaryWithNavigate(props) {
  const navigate = useNavigate();

  // Pass navigate function as a prop to the ErrorBoundary
  return <ErrorBoundary navigate={navigate} {...props} />;
}

export default ErrorBoundaryWithNavigate;
