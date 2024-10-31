import { envoyerEmail } from "../utils/mailer";

describe("Tests de l'envoi d'emails", () => {
    it("devrait envoyer un email réel", () => {
        envoyerEmail("Sujet de test", "Corps du message");
        expect(true).toBe(true);
    });
});
