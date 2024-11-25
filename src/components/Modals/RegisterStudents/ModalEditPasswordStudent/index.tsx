import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { FormHelperText, InputAdornment } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { IconButton } from '@mui/material';
import { Button, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'components/@extended/SnackbarContext';
import MainCard from 'components/MainCard';
import useUser from 'hooks/useUser';
import { useState } from 'react';
import { UserProps } from 'types/user';
import axiosServices from 'utils/axios';

interface ModalProps {
  dataStudent: UserProps;
  onClose: () => void;
  onSearch: (search: boolean) => void;
}

export default function ModalEditPasswordStudent({ dataStudent, onClose, onSearch }: ModalProps) {
  const theme = useTheme();
  const user = useUser();
  const token = user?.token;
  const { showSnackbar } = useSnackbar();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [capsWarning, setCapsWarning] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const handleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  const isPasswordMismatch = password && confirmPassword && password !== confirmPassword;

  const handleSubmit = async () => {
    const newRegister = {
      senha: password
    };
    try {
      await axiosServices
        .post(`/usuario/editar-senha/${dataStudent.id_usuario}`, newRegister, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .finally(() => {
          showSnackbar('Senha alterada com sucesso', true);
          onClose();
          onSearch(true);
        });
    } catch (error) {
      showSnackbar('Erro ao alterar senha', false);
    }
  };

  const checkDisabled = () => {
    if (!password || !confirmPassword || isPasswordMismatch) {
      return true;
    } else return false;
  };

  return (
    <Grid container sx={{ backgroundColor: theme.palette.grey[200] }}>
      <Grid item container spacing={2} padding={2}>
        <Grid item xs={6}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item xs={4}>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Senha:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <MainCard content={false}>
                <OutlinedInput
                  id="senha"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePasswordVisibility}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Digite sua senha"
                  color={capsWarning ? 'warning' : 'primary'}
                />
              </MainCard>
            </Grid>
          </Grid>
          {capsWarning && (
            <Grid container justifyContent="center">
              <Typography variant="caption" sx={{ color: 'warning.main' }}>
                Caps lock ativo!
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid item xs={6}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item xs={4}>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Confirmar Senha:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <MainCard content={false}>
                <OutlinedInput
                  id="confirmar-senha"
                  fullWidth
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleConfirmPasswordVisibility}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Confirme sua senha"
                />
              </MainCard>
            </Grid>
          </Grid>
          {isPasswordMismatch && (
            <Grid container justifyContent="center">
              <FormHelperText error id="helper-text-confirmar-senha">
                As senhas não coincidem.
              </FormHelperText>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="end" spacing={2} direction="row">
            <Grid item>
              <Button variant="contained" fullWidth onClick={handleSubmit} disabled={checkDisabled()}>
                Salvar dados
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
