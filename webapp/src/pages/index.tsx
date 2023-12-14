import { Container } from "@mui/material";
import { tss } from "tss-react/dsfr";

export default function Home() {
  const { classes } = useStyles();

  return (
    <Container className={classes.container}>
      <h1>Carte Jeune Engagé</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, vero
        aperiam saepe nam expedita dignissimos tempora quidem delectus fugiat,
        perferendis a similique iste nesciunt, minus fugit vitae harum non
        reprehenderit?
      </p>
    </Container>
  );
}

const useStyles = tss.create({
  container: {
    marginTop: "2rem",
  },
});
