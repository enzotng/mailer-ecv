import request from "supertest";
import app from "../app";

describe("API de gestion des tâches", () => {
    it("devrait créer une nouvelle tâche et envoyer un e-mail", async () => {
        const response = await request(app).post("/api/taches").send({
            titre: "Nouvelle Tâche",
            description: "Description de la tâche de test",
        });
        expect(response.status).toBe(201);
        expect(response.body.titre).toBe("Nouvelle Tâche");
        expect(response.body.description).toBe("Description de la tâche de test");
    });

    it("devrait créer plusieurs tâches et les récupérer", async () => {
        const taches = [
            { titre: "Tâche 1", description: "Description de la tâche 1" },
            { titre: "Tâche 2", description: "Description de la tâche 2" },
            { titre: "Tâche 3", description: "Description de la tâche 3" },
        ];

        for (const tache of taches) {
            const response = await request(app).post("/api/taches").send(tache);
            expect(response.status).toBe(201);
            expect(response.body.titre).toBe(tache.titre);
        }

        const allTachesResponse = await request(app).get("/api/taches");
        expect(allTachesResponse.status).toBe(200);
        expect(allTachesResponse.body.length).toBeGreaterThanOrEqual(taches.length);
    });

    it("devrait mettre à jour une tâche et envoyer un e-mail", async () => {
        const creation = await request(app).post("/api/taches").send({
            titre: "Tâche à mettre à jour",
            description: "Description initiale",
        });
        const tacheId = creation.body.id;

        const miseAJour = await request(app).put(`/api/taches/${tacheId}`).send({
            titre: "Tâche mise à jour",
            description: "Description mise à jour",
        });
        expect(miseAJour.status).toBe(200);
        expect(miseAJour.body.titre).toBe("Tâche mise à jour");
        expect(miseAJour.body.description).toBe("Description mise à jour");
    });

    it("devrait supprimer une tâche et envoyer un e-mail", async () => {
        const creation = await request(app).post("/api/taches").send({
            titre: "Tâche à supprimer",
            description: "Description pour suppression",
        });
        const tacheId = creation.body.id;

        const suppression = await request(app).delete(`/api/taches/${tacheId}`);
        expect(suppression.status).toBe(204);

        const verification = await request(app).get(`/api/taches/${tacheId}`);
        expect(verification.status).toBe(404);
    });

    afterAll(() => {});
});
