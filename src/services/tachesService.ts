interface Tache {
    id: string;
    titre: string;
    description: string;
}

export class TachesService {
    private taches: Tache[] = [];
    private prochainId = 1;

    recupererToutesLesTaches(): Tache[] {
        return this.taches;
    }

    recupererTacheParId(id: string): Tache | undefined {
        return this.taches.find((tache) => tache.id === id);
    }

    creerTache(data: { titre: string; description: string }): Tache {
        const nouvelleTache: Tache = {
            id: (this.prochainId++).toString(),
            titre: data.titre,
            description: data.description,
        };
        this.taches.push(nouvelleTache);
        return nouvelleTache;
    }

    mettreAJourTache(id: string, data: { titre?: string; description?: string }): Tache | undefined {
        const tache = this.recupererTacheParId(id);
        if (tache) {
            tache.titre = data.titre ?? tache.titre;
            tache.description = data.description ?? tache.description;
            return tache;
        }
        return undefined;
    }

    supprimerTache(id: string): boolean {
        const index = this.taches.findIndex((tache) => tache.id === id);
        if (index !== -1) {
            this.taches.splice(index, 1);
            return true;
        }
        return false;
    }
}
