import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TransportationForm from '../components/Forms/TransportationForm';


  

describe('TransportationForm', () => {
  it('renders correctly', () => {
    const { getByLabelText } = render(<TransportationForm />);
    
    expect(getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(getByLabelText(/Transportation Type:/i)).toBeInTheDocument();
    expect(getByLabelText(/Expenses:/i)).toBeInTheDocument();
    expect(getByLabelText(/Link to your confirmation email:/i)).toBeInTheDocument();
    expect(getByLabelText(/Notes:/i)).toBeInTheDocument();
  });

});



