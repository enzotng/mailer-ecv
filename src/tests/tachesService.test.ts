import request from "supertest";
import app from "../app";

describe("Tests de la base de données en mémoire via l'API", () => {
    let idNouvelleTache: string;

    it("devrait créer une nouvelle tâche", async () => {
        const response = await request(app).post("/api/taches").send({
            titre: "Préparer la réunion de projet",
            description: "Créer la présentation et préparer les notes pour la réunion de lundi matin.",
        });
        expect(response.status).toBe(201);
        expect(response.body.titre).toBe("Préparer la réunion de projet");
        idNouvelleTache = response.body.id;
    });

    it("devrait récupérer toutes les tâches", async () => {
        const response = await request(app).get("/api/taches");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("devrait récupérer une tâche par ID", async () => {
        const response = await request(app).get(`/api/taches/${idNouvelleTache}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(idNouvelleTache);
        expect(response.body.titre).toBe("Préparer la réunion de projet");
    });

    it("devrait mettre à jour une tâche", async () => {
        const response = await request(app).put(`/api/taches/${idNouvelleTache}`).send({
            titre: "Préparer la réunion de suivi du projet",
            description: "Ajouter des points spécifiques sur l'avancement des livrables et les prochaines étapes.",
        });
        expect(response.status).toBe(200);
        expect(response.body.titre).toBe("Préparer la réunion de suivi du projet");
    });

    it("devrait supprimer une tâche", async () => {
        const response = await request(app).delete(`/api/taches/${idNouvelleTache}`);
        expect(response.status).toBe(204);

        const checkResponse = await request(app).get(`/api/taches/${idNouvelleTache}`);
        expect(checkResponse.status).toBe(404);
    });
});
