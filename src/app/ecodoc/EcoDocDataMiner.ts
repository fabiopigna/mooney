import { EcoDoc } from './EcoDocParser';
import { EcoCategory } from './category/EcoCategory';
import { IEcoCategoryRule } from './category/IEcoCategoryRule';
import { AndEcoCategoryRule } from './category/AndEcoCategoryRule';
import { OrEcoCategoryRule } from './category/OrEcoCategoryRule';
export class EcoDocDataMiner {

    static emptyCategory: EcoCategory = new EcoCategory('others');
    ecoDoc: EcoDoc;
    categoryRules: IEcoCategoryRule[];

    constructor(ecoDoc: EcoDoc) {
        this.ecoDoc = ecoDoc;
        this.categoryRules = [
            new AndEcoCategoryRule(new EcoCategory('bollette', new EcoCategory('gas')), ['ENI DIVISIONE GAS POWER', 'ADDEBITO SDD']),
            new AndEcoCategoryRule(new EcoCategory('bollette', new EcoCategory('luce')), ['BOLLETTINO POSTALE A ENEL SERVIZIO ELETTRICO']),
            new OrEcoCategoryRule(new EcoCategory('bollette', new EcoCategory('telefono')), ['Ricarica telefonica']),
            new AndEcoCategoryRule(new EcoCategory('banca', new EcoCategory('polizza')), ['ADD.PREMIO POLIZZA', 'PROTEZIONE OTTIMISMO']),
            new OrEcoCategoryRule(new EcoCategory('banca', new EcoCategory('bollettino')), [
                'COMMISSIONI SU BOLLETTINO POSTALE',
                'SPESE SU BOLLETTINO POSTALE',
                'COMMISSIONI SU BONIFICO']),
            new OrEcoCategoryRule(new EcoCategory('banca', new EcoCategory('nowbanking')), [
                'Canone Nowbanking Privati',
                'COMPETENZE LIQUIDAZIONE DI CONTO CORRENTE',
                'BOLLO E/C ART.13']),
            new AndEcoCategoryRule(new EcoCategory('banca', new EcoCategory('reed')), ['COMMISSIONI ADDEBITO UTENZE - BONIFICI']),
            new AndEcoCategoryRule(new EcoCategory('casa', new EcoCategory('mutuo')), ['PAG.RATA', 'MUTUO IPOTECARIO']),
            new AndEcoCategoryRule(new EcoCategory('casa', new EcoCategory('assicurazione casa')), ['PAG.RATA', 'MUTUO CHIROGRAFARIO']),
            new OrEcoCategoryRule(new EcoCategory('casa', new EcoCategory('clima')), ['RIFERIMENTO SCT:CLIMA']),
            new OrEcoCategoryRule(new EcoCategory('casa', new EcoCategory('arrendamento')), [
                'IKEA VILLESSE',
                'LEROY MERLIN ITALIA',
                'BRICOCENTER',
                'FERROJULIA SRL']),
            new OrEcoCategoryRule(new EcoCategory('casa', new EcoCategory('spesa')), [
                'SUPERMERCATO',
                'LIDL',
                'IPERMERCATO',
                'UNICOMM SRL - STARANZANO GO']),
            new OrEcoCategoryRule(new EcoCategory('fun', new EcoCategory('ristorante')), [
                'RISTORANTE',
                'LA RUSTICANA',
                'ZUSHI',
                'OMEGA SRL',
                'RANCH']),
            new OrEcoCategoryRule(new EcoCategory('fun', new EcoCategory('sport')), [
                'DECATHLON',
                'CISALFA']),
            new OrEcoCategoryRule(new EcoCategory('trasporti', new EcoCategory('gasolio')), ['OMV', 'BS LIPICA']),
            new AndEcoCategoryRule(new EcoCategory('trasporti', new EcoCategory('telepass')), ['TELEPASS']),
            new AndEcoCategoryRule(new EcoCategory('lavoro'), ['STIPENDIO']),
            new OrEcoCategoryRule(new EcoCategory('varie'), ['PRELIEVO', 'PREL. CON CARTA', 'CARTASI']),
            new OrEcoCategoryRule(new EcoCategory('vacanze'), [
                'PARCHEGGIO IL SOLE',
                'CAESAR TOUR S.R.L',
                'KARPATHOS']),
        ]
    }

    categorize(): EcoDoc {
        this.ecoDoc.entries.forEach(entry => {
            this.categoryRules.forEach(categoryRule => {
                categoryRule.tryToCategorize(entry);
            });
        });
        return this.ecoDoc;
    }




}


