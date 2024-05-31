export const formatDate = (date) => {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];
  };
  export const getStatusColor = (status) => {
    switch (status) {
      case 'Not Started':
        return 'text-danger'; 
      case 'In Progress':
        return 'text-warning'; 
      case 'Completed':
        return 'text-success'; 
      default:
        return 'text-dark'; 
    }
  };