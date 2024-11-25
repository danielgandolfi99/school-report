// material-ui
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { OverrideIcon } from 'types/root';

// ===========================|| HOVER SOCIAL CARD ||=========================== //

interface CardButtonProps {
  primary: string;
  secondary?: string;
  iconPrimary: OverrideIcon;
  color: string;
  onClickAction: () => void;
}

const CardButton = ({ primary, secondary, iconPrimary, color, onClickAction }: CardButtonProps) => {
  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary /> : null;

  return (
    <Card
      elevation={3}
      sx={{
        height: 110,
        background: color,
        position: 'relative',
        justifyContent: 'center',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        '&:hover svg': {
          opacity: 1,
          transform: 'scale(1.1)'
        },
        ':hover': {
          cursor: 'pointer',
          transform: 'scale(1.05)'
        }
      }}
      onClick={onClickAction}
    >
      <CardContent>
        <Box
          sx={{
            position: 'absolute',
            right: 15,
            color: '#fff',
            '& svg': {
              width: 36,
              height: 36,
              opacity: 0.5,
              transition: 'all .3s ease-in-out'
            }
          }}
        >
          {primaryIcon}
        </Box>
        <Grid container alignItems="center">
          <Grid item xs={10} alignItems="center">
            <Typography variant="h3" color="inherit" alignItems="center">
              {primary}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h5" color="inherit">
              {secondary}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardButton;
