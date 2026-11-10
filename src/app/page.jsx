import Chargement from "../components/Chargement";
import AccueilClient from "./AccueilClient";

// La page est rendue côté serveur pour que l'écran de chargement soit dans le
// HTML et s'affiche tout de suite ; l'accueil lui-même est rendu côté client.
export default function Page() {
  return (
    <>
      <Chargement />
      <AccueilClient />
    </>
  );
}
