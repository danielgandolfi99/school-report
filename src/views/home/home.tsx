import CardButton from 'components/CardButton';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import HistoryIcon from '@mui/icons-material/History';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Grid } from '@mui/material';

const Home = () => {
  const router = useRouter();
  const theme = useTheme();

  const options = [
    { title: 'Registro de Alunos', link: '/registro-alunos', icon: PersonIcon },
    { title: 'Registro de Disciplinas', link: '/registro-disciplinas', icon: LibraryBooksIcon },
    { title: 'Registro de Notas', link: '/registro-notas', icon: DescriptionIcon },
    { title: 'Gerar Histórico Escolar', link: '/registro-historico', icon: HistoryIcon }
  ];

  return (
    <Grid>
      <Grid container rowSpacing={4} columnSpacing={4} alignItems="center" padding={2}>
        {options.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
            <CardButton
              primary={item.title}
              color={theme.palette.primary.main}
              iconPrimary={item.icon}
              onClickAction={() => router.push(item.link)}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Home;
