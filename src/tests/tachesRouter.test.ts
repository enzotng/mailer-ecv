import request from "supertest";
import app from "../app";

describe("API de gestion des tâches", () => {
    it("devrait créer une nouvelle tâche et envoyer un e-mail", async () => {
        const response = await request(app).post("/taches").send({
            titre: "Nouvelle Tâche",
            description: "Description de la tâche",
        });
        expect(response.status).toBe(201);
        expect(response.body.titre).toBe("Nouvelle Tâche");
    });

    it("devrait mettre à jour une tâche et envoyer un e-mail", async () => {
        const creation = await request(app).post("/taches").send({
            titre: "Tâche à mettre à jour",
            description: "Description initiale",
        });
        const tacheId = creation.body.id;

        const miseAJour = await request(app).put(`/taches/${tacheId}`).send({
            titre: "Tâche mise à jour",
        });
        expect(miseAJour.status).toBe(200);
        expect(miseAJour.body.titre).toBe("Tâche mise à jour");
    });

    it("devrait supprimer une tâche et envoyer un e-mail", async () => {
        const creation = await request(app).post("/taches").send({
            titre: "Tâche à supprimer",
            description: "Description",
        });
        const tacheId = creation.body.id;

        const suppression = await request(app).delete(`/taches/${tacheId}`);
        expect(suppression.status).toBe(204);
    });
});
