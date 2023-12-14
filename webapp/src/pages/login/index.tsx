import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { tss } from "tss-react/dsfr";

export default function Login() {
  const { classes, cx } = useStyles();

  return (
    <div className={fr.cx("fr-container")}>
      <Breadcrumb
        currentPageLabel="Connexion"
        homeLinkProps={{
          href: "/",
        }}
        segments={[]}
      />
      <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
          <h2 className={fr.cx("fr-mb-12v")}>Connexion</h2>
          <div
            className={cx(
              classes.formContainer,
              fr.cx(
                "fr-grid-row",
                "fr-grid-row--center",
                "fr-py-16v",
                "fr-mb-16v"
              )
            )}
          >
            <div
              className={fr.cx(
                "fr-col-12",
                "fr-col-md-8",
                "fr-px-4v",
                "fr-px-md-0"
              )}
            >
              Formulaire de connexion
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = tss.create({
  formContainer: {
    backgroundColor: fr.colors.decisions.background.alt.grey.default,
    [fr.breakpoints.down("md")]: {
      marginLeft: `-${fr.spacing("4v")}`,
      marginRight: `-${fr.spacing("4v")}`,
    },
  },
});
