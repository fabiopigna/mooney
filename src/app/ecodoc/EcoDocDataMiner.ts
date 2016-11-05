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
            new OrEcoCategoryRule(new EcoCategory('bollette', new EcoCategory('gas')), [
                'EST PIU SPA ISOGAS',
                'ESTENERGY S.P.A. GAS',
                'ENI DIVISIONE GAS POWER']),
            new OrEcoCategoryRule(new EcoCategory('bollette', new EcoCategory('luce')), [
                'BOLLETTINO POSTALE A ENEL SERVIZIO ELETTRICO',
                'HERA S.P.A.']),
            new OrEcoCategoryRule(new EcoCategory('bollette', new EcoCategory('telefono')), [
                'Ricarica telefonica',
                'WIND']),
            new OrEcoCategoryRule(new EcoCategory('casa', new EcoCategory('affitto')), ['POLLI LUCIANO']),
            new OrEcoCategoryRule(new EcoCategory('casa', new EcoCategory('ristrutturazione')), [
                'CESCUTTI PIASTRELLE',
                'IDROCALOR SRL',
                'FATTURA N. 734 CODICE CLIENT']),
            new AndEcoCategoryRule(new EcoCategory('banca', new EcoCategory('polizza')), ['ADD.PREMIO POLIZZA', 'PROTEZIONE OTTIMISMO']),
            new OrEcoCategoryRule(new EcoCategory('tasse', new EcoCategory('varie')), ['F24HB']),
            new OrEcoCategoryRule(new EcoCategory('banca', new EcoCategory('bollettino')), [
                'COMMISSIONI SU BOLLETTINO POSTALE',
                'SPESE SU BOLLETTINO POSTALE',
                'COMMISSIONI SU BONIFICO',
                'RECUPERO SPESE']),
            new OrEcoCategoryRule(new EcoCategory('banca', new EcoCategory('nowbanking')), [
                'Canone Nowbanking Privati',
                'COMPETENZE LIQUIDAZIONE DI CONTO CORRENTE',
                'BOLLO E/C ART.13']),
            new AndEcoCategoryRule(new EcoCategory('banca', new EcoCategory('reed')), ['COMMISSIONI ADDEBITO UTENZE - BONIFICI']),
            new AndEcoCategoryRule(new EcoCategory('casa', new EcoCategory('mutuo')), ['PAG.RATA', 'MUTUO IPOTECARIO']),
            new OrEcoCategoryRule(new EcoCategory('casa', new EcoCategory('mutuo')), ['CREDIT AGRICOLE ASS NI PAGAMENTO CONTRATTO']),
            new AndEcoCategoryRule(new EcoCategory('casa', new EcoCategory('mutuo')), ['ADDEBITO RATA FINANZ']),
            new AndEcoCategoryRule(new EcoCategory('casa', new EcoCategory('assicurazione casa')), ['PAG.RATA', 'MUTUO CHIROGRAFARIO']),
            new OrEcoCategoryRule(new EcoCategory('casa', new EcoCategory('clima')), ['RIFERIMENTO SCT:CLIMA']),
            new OrEcoCategoryRule(new EcoCategory('casa', new EcoCategory('arrendamento')), [
                'IKEA',
                'LEROY MERLIN ITALIA',
                'BRICOCENTER',
                'FERROJULIA SRL',
                'SME - MARTIGNACCO',
                'CONFORAMA ITALIA',
                'IS4 UD BAGNARIA',
                'MERCATONE UNO',
                'CO IMPORT',
                'GARDEN ANNA',
                'HAPPY CASA',
                'KASANOVA'
            ]),
            new OrEcoCategoryRule(new EcoCategory('casa', new EcoCategory('spesa')), [
                'SUPERMERCATO',
                'LIDL',
                'IPERMERCATO',
                'UNICOMM SRL - STARANZANO GO',
                'DPIU']),
            new OrEcoCategoryRule(new EcoCategory('fun', new EcoCategory('ristorante')), [
                'RISTORANTE',
                'LA RUSTICANA',
                'ZUSHI',
                'OMEGA SRL',
                'RANCH',
                'AL LIDO',
                'TEPPAN - MARTIGNACCO',
                'TRATTORIA',
                'BEFED',
                'LAGANIS SAMUELE'
            ]),
            new OrEcoCategoryRule(new EcoCategory('fun', new EcoCategory('abbigliamento')), [
                'ALCOTT UNITA',
                'VICTORY',
                'KEYS',
                'H & M',
                'OVS',
                'MOTIVI',
                'CONBIPEL',
                'SCARPE',
                'THOR - TRIESTE',
                'CALZEDONIA',
                'TERRANOVA'
            ]),
            new OrEcoCategoryRule(new EcoCategory('fun', new EcoCategory('regali')), [
                'STROILI ORO',
                'NOBILE CRISTALLERIE',
                'WITZ S.R.L.',
                'TOYS CENTER',
                'LISTA NOZZE',
                'GIOKIT TRIESTE'
            ]),
            new OrEcoCategoryRule(new EcoCategory('fun', new EcoCategory('sport')), [
                'DECATHLON',
                'CISALFA']),
            new OrEcoCategoryRule(new EcoCategory('trasporti', new EcoCategory('gasolio')), [
                'OMV',
                'BS LIPICA',
                'BS SEZANA',
                'DISTRIBUTORE BERNARD']),
            new OrEcoCategoryRule(new EcoCategory('trasporti', new EcoCategory('manutenzione')), [
                'AUTOFFICINA RENZO',
                'NORAUTO ITALIA SPA',
                'NOVATI & MIO']),
            new AndEcoCategoryRule(new EcoCategory('trasporti', new EcoCategory('telepass')), ['TELEPASS']),
            new AndEcoCategoryRule(new EcoCategory('lavoro'), ['STIPENDIO']),
            new OrEcoCategoryRule(new EcoCategory('varie'), ['PRELIEVO', 'PREL. CON CARTA', 'CARTASI', ]),
            new OrEcoCategoryRule(new EcoCategory('vacanze'), [
                'PARCHEGGIO IL SOLE',
                'CAESAR TOUR S.R.L',
                'KARPATHOS',
                'CAPRI']),
            new OrEcoCategoryRule(new EcoCategory('salute', new EcoCategory('fisio')), [
                'STUDIO FISIOTERAPIA',
                'POLICLINICO',
                'FARMACIA']),
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


