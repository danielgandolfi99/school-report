import { Grid, Typography } from '@mui/material';
// import CardButton from 'components/CardButton';
import MainCard from 'components/MainCard';
// import { useRouter } from 'next/navigation';
// import { useTheme } from '@mui/system';
// import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
// import { transportadoras } from 'constants/transportConfig';
// import { useSession } from 'next-auth/react';
// import { useEffect } from 'react';

const Home = () => {
  //   const { data: session } = useSession();
  //   const router = useRouter();
  //   const theme = useTheme();
  //   const username = session?.user.username;

  //   useEffect(() => {
  //     if (username) {
  //       if (username === 'tiago' || username === 'rogerio' || username === 'edemilson') {
  //         router.push('/transportadora/transfarroupilha');
  //       } else if (username === 'mariotur') {
  //         router.push('/transportadora/mariotur');
  //       }
  //     }
  //   }, [router, username]);

  return (
    <Grid>
      <MainCard title={<Typography variant="h5">Transportadoras</Typography>}>
        <Grid container rowSpacing={4} columnSpacing={4} alignItems="center">
          {/* {transportadoras &&
            transportadoras.map((item, index) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                <CardButton
                  primary={item.description}
                  color={theme.palette.primary.main}
                  iconPrimary={DirectionsBusIcon}
                  onClickAction={() => {
                    router.push(`/transportadora/${item.value}`);
                  }}
                />
              </Grid>
            ))} */}
        </Grid>
      </MainCard>
    </Grid>
  );
};

export default Home;
