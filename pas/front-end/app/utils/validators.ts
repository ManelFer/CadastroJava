export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validateAge = (age: string): { valid: boolean; message?: string } => {
    const num = parseInt(age);
    if (isNaN(num)) {
      return { valid: false, message: 'Idade deve ser um número' };
    }
    if (num < 18) {
      return { valid: false, message: 'O responsável deve ser maior de 18 anos' };
    }
    if (num > 120) {
      return { valid: false, message: 'Idade inválida' };
    }
    return { valid: true };
  };