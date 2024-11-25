import React, { createContext, useContext, useState } from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

interface SnackbarContextType {
  showSnackbar: (message: string, success: boolean) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    color: 'success' as 'success' | 'error'
  });

  const showSnackbar = (message: string, success: boolean) => {
    setSnackbar({ open: true, message, color: success ? 'success' : 'error' });

    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 3000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.open && (
        <MuiSnackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.color}
            sx={{
              color: snackbar.color === 'success' ? 'green' : 'red',
              bgcolor: snackbar.color === 'success' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
              '& .MuiAlert-icon': {
                color: snackbar.color === 'success' ? 'green' : 'red'
              }
            }}
          >
            {snackbar.message}
          </Alert>
        </MuiSnackbar>
      )}
    </SnackbarContext.Provider>
  );
};
