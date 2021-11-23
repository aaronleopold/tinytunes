import React from 'react';
import useNavigate from '../hooks/useNavigate';
import Button, { ButtonProps } from './ui/Button';

interface NavigationButtonProps extends Omit<ButtonProps, 'onClick' | 'ref'> {
  to: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  to,
  ...props
}) => {
  const { navigate } = useNavigate();

  const handleNavigate = () => {
    navigate(to);
  };

  return <Button onClick={handleNavigate} {...props} />;
};

export default NavigationButton;
