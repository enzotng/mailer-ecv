import { Router, Request, Response } from "express";
import { TachesService } from "../services/tachesService";
import { envoyerEmail } from "../utils/mailer";

const router = Router();
const tachesService = new TachesService();

router.get("/", (req: Request, res: Response) => {
    try {
        const taches = tachesService.recupererToutesLesTaches();
        console.log("Tâches récupérées:", taches);
        res.status(200).json(taches);
    } catch (error) {
        console.error("Erreur lors de la récupération des tâches:", error);
        res.status(500).send("Erreur interne du serveur");
    }
});

router.get("/:id", (req: Request, res: Response) => {
    try {
        const tache = tachesService.recupererTacheParId(req.params.id);
        if (tache) {
            res.status(200).json(tache);
        } else {
            res.status(404).send("Tâche non trouvée");
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération de la tâche avec l'ID ${req.params.id}:`, error);
        res.status(500).send("Erreur interne du serveur");
    }
});

router.post("/", (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        console.error("Erreur lors de la création de la tâche:", error);
        res.status(500).send("Erreur interne du serveur");
    }
});

router.put("/:id", (req: Request, res: Response) => {
    try {
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
            res.status(200).json(tacheMiseAJour);
        } else {
            res.status(404).send("Tâche non trouvée");
        }
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de la tâche avec l'ID ${req.params.id}:`, error);
        res.status(500).send("Erreur interne du serveur");
    }
});

router.delete("/:id", (req: Request, res: Response) => {
    try {
        const estSupprimee = tachesService.supprimerTache(req.params.id);
        if (estSupprimee) {
            envoyerEmail(
                "Tâche supprimée",
                `La tâche avec l'ID ${req.params.id} a été supprimée du système à la date : ${new Date().toLocaleString()}.`
            );
            res.status(204).send();
        } else {
            res.status(404).send("Tâche non trouvée");
        }
    } catch (error) {
        console.error(`Erreur lors de la suppression de la tâche avec l'ID ${req.params.id}:`, error);
        res.status(500).send("Erreur interne du serveur");
    }
});

export default router;
