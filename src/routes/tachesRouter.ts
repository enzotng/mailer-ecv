import { Router, Request, Response } from "express";
import { TachesService } from "../services/tachesService";
import { envoyerEmail } from "../utils/mailer";

const router = Router();
const tachesService = new TachesService();

router.get("/", (req: Request, res: Response) => {
    const taches = tachesService.recupererToutesLesTaches();
    res.json(taches);
});

router.get("/:id", (req: Request, res: Response) => {
    const tache = tachesService.recupererTacheParId(req.params.id);
    if (tache) {
        res.json(tache);
    } else {
        res.status(404).send("Tâche non trouvée");
    }
});

router.post("/", (req: Request, res: Response) => {
    const nouvelleTache = tachesService.creerTache(req.body);
    envoyerEmail(
        "Nouvelle tâche créée",
        `Une nouvelle tâche a été ajoutée :
    - Titre : ${nouvelleTache.titre}
    - Description : ${nouvelleTache.description}
    - Date de création : ${new Date().toLocaleString()}
    - ID : ${nouvelleTache.id}`
    );
    res.status(201).json(nouvelleTache);
});

router.put("/:id", (req: Request, res: Response) => {
    const tacheMiseAJour = tachesService.mettreAJourTache(req.params.id, req.body);
    if (tacheMiseAJour) {
        envoyerEmail(
            "Mise à jour de tâche",
            `La tâche suivante a été mise à jour :
      - Titre : ${tacheMiseAJour.titre}
      - Description : ${tacheMiseAJour.description}
      - Date de mise à jour : ${new Date().toLocaleString()}
      - ID : ${tacheMiseAJour.id}`
        );
        res.json(tacheMiseAJour);
    } else {
        res.status(404).send("Tâche non trouvée");
    }
});

router.delete("/:id", (req: Request, res: Response) => {
    const estSupprimee = tachesService.supprimerTache(req.params.id);
    if (estSupprimee) {
        envoyerEmail("Tâche supprimée", `La tâche avec l'ID ${req.params.id} a été supprimée du système à la date : ${new Date().toLocaleString()}.`);
        res.status(204).send();
    } else {
        res.status(404).send("Tâche non trouvée");
    }
});

export default router;
