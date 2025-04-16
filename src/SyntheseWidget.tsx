import React, { ReactElement, createElement, useEffect, useState } from "react";
import { Big } from "big.js";
import { SyntheseWidgetContainerProps } from "../typings/SyntheseWidgetProps";
import { CardConsoTotal } from "./components/CardConsoTotal";
import { ColumnChart } from "./components/ColumnChart";
import { SecteurConsoCard } from "./components/SecteurConsoCard";
import { SecteurData } from "./components/ColumnChart";
import { DPE } from "./components/DPE";
import { DateRangeSelector } from "./components/DateRangeSelector";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { LoadingService } from "./components/services/LoadingService";

import "./ui/SyntheseWidget.css";
import "./styles/loader.css";

export function SyntheseWidget({
    dsUsine,
    attrTotalConsoElec,
    attrTotalConsoGaz,
    attrTotalConsoEau,
    attrTotalConsoAir,
    attrTotalConsoElecPeriodPrec,
    attrTotalConsoGazPeriodPrec,
    attrTotalConsoEauPeriodPrec,
    attrTotalConsoAirPeriodPrec,
    dsSecteurs,
    attrSecteurNom,
    attrSecteurConsoElec,
    attrSecteurConsoGaz,
    attrSecteurConsoEau,
    attrSecteurConsoAir,
    attrSecteurConsoElecPrec,
    attrSecteurConsoGazPrec,
    attrSecteurConsoEauPrec,
    attrSecteurConsoAirPrec,
    dateDebut,
    dateFin,
    onClickDay,
    onClickWeek,
    onClickMonth,
    onClickSecteurElec,
    onClickSecteurGaz,
    onClickSecteurEau,
    onClickSecteurAir
}: SyntheseWidgetContainerProps): ReactElement {
    const [usineData, setUsineData] = useState<{
        consoElec: Big;
        consoGaz: Big;
        consoEau: Big;
        consoAir: Big;
        consoElecPrec: Big;
        consoGazPrec: Big;
        consoEauPrec: Big;
        consoAirPrec: Big;
    }>({
        consoElec: new Big(0),
        consoGaz: new Big(0),
        consoEau: new Big(0),
        consoAir: new Big(0),
        consoElecPrec: new Big(0),
        consoGazPrec: new Big(0),
        consoEauPrec: new Big(0),
        consoAirPrec: new Big(0)
    });

    const [secteursData, setSecteursData] = useState<SecteurData[]>([]);

    const [activePeriod, setActivePeriod] = useState<'day' | 'week' | 'month'>('day');

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const unsubscribe = LoadingService.subscribe((loading) => {
            setIsLoading(loading);
            if (loading) {
                setMessage(LoadingService.getMessage());
            }
        });
        
        return () => {
            unsubscribe();
        };
    }, []);

    const executeAction = (action: any, loadingMessage?: string) => {
        if (action?.canExecute) {
            LoadingService.executeAction(action, loadingMessage);
        }
    };

    useEffect(() => {
        if (dsUsine.status === "available" && dsUsine.items && dsUsine.items[0]) {
            const item = dsUsine.items[0];
            setUsineData({
                consoElec: attrTotalConsoElec.get(item).value ?? new Big(0),
                consoGaz: attrTotalConsoGaz.get(item).value ?? new Big(0),
                consoEau: attrTotalConsoEau.get(item).value ?? new Big(0),
                consoAir: attrTotalConsoAir.get(item).value ?? new Big(0),
                consoElecPrec: attrTotalConsoElecPeriodPrec.get(item).value ?? new Big(0),
                consoGazPrec: attrTotalConsoGazPeriodPrec.get(item).value ?? new Big(0),
                consoEauPrec: attrTotalConsoEauPeriodPrec.get(item).value ?? new Big(0),
                consoAirPrec: attrTotalConsoAirPeriodPrec.get(item).value ?? new Big(0)
            });
        }
    }, [dsUsine, attrTotalConsoElec, attrTotalConsoGaz, attrTotalConsoEau, attrTotalConsoAir,
        attrTotalConsoElecPeriodPrec, attrTotalConsoGazPeriodPrec, attrTotalConsoEauPeriodPrec, attrTotalConsoAirPeriodPrec]);

    useEffect(() => {
        if (dsSecteurs.status === "available" && dsSecteurs.items) {
            const secteurs = dsSecteurs.items.map(item => ({
                name: attrSecteurNom.get(item).value ?? "Secteur inconnu",
                consoElec: attrSecteurConsoElec.get(item).value ?? new Big(0),
                consoGaz: attrSecteurConsoGaz.get(item).value ?? new Big(0),
                consoEau: attrSecteurConsoEau.get(item).value ?? new Big(0),
                consoAir: attrSecteurConsoAir.get(item).value ?? new Big(0),
                consoElecPrec: attrSecteurConsoElecPrec.get(item).value ?? new Big(0),
                consoGazPrec: attrSecteurConsoGazPrec.get(item).value ?? new Big(0),
                consoEauPrec: attrSecteurConsoEauPrec.get(item).value ?? new Big(0),
                consoAirPrec: attrSecteurConsoAirPrec.get(item).value ?? new Big(0)
            }));
            setSecteursData(secteurs);
        }
    }, [dsSecteurs, attrSecteurNom, attrSecteurConsoElec, attrSecteurConsoGaz, attrSecteurConsoEau, attrSecteurConsoAir,
        attrSecteurConsoElecPrec, attrSecteurConsoGazPrec, attrSecteurConsoEauPrec, attrSecteurConsoAirPrec]);

    const handleDateRangeChange = (period: 'day' | 'week' | 'month') => {
        setActivePeriod(period);
        
        const periodsMap = {
            'day': 'Chargement des données du jour',
            'week': 'Chargement des données de la semaine',
            'month': 'Chargement des données du mois'
        };
        
        const loadingMessage = periodsMap[period];
        
        switch (period) {
            case 'day':
                if (onClickDay?.canExecute) {
                    executeAction(onClickDay, loadingMessage);
                }
                break;
            case 'week':
                if (onClickWeek?.canExecute) {
                    executeAction(onClickWeek, loadingMessage);
                }
                break;
            case 'month':
                if (onClickMonth?.canExecute) {
                    executeAction(onClickMonth, loadingMessage);
                }
                break;
        }

        const now = new Date();
        let start = new Date();

        switch (period) {
            case "day":
                start.setHours(0, 0, 0, 0);
                break;
            case "week":
                start.setDate(now.getDate() - now.getDay());
                start.setHours(0, 0, 0, 0);
                break;
            case "month":
                start.setDate(1);
                start.setHours(0, 0, 0, 0);
                break;
        }

        if (dsUsine.status === "available" && dsUsine.items && dsUsine.items[0]) {
            dateDebut.setValue(new Date(start.toISOString()));
            dateFin.setValue(new Date());
        }
    };

    // Gestionnaires de clic pour chaque type d'énergie
    const handleSecteurElecClick = (secteurName: string) => {
        if (onClickSecteurElec?.canExecute) {
            const loadingMessage = `Navigation vers le détail électricité du secteur ${secteurName}`;
            executeAction(onClickSecteurElec, loadingMessage);
        }
    };

    const handleSecteurGazClick = (secteurName: string) => {
        if (onClickSecteurGaz?.canExecute) {
            const loadingMessage = `Navigation vers le détail gaz du secteur ${secteurName}`;
            executeAction(onClickSecteurGaz, loadingMessage);
        }
    };

    const handleSecteurEauClick = (secteurName: string) => {
        if (onClickSecteurEau?.canExecute) {
            const loadingMessage = `Navigation vers le détail eau du secteur ${secteurName}`;
            executeAction(onClickSecteurEau, loadingMessage);
        }
    };

    const handleSecteurAirClick = (secteurName: string) => {
        if (onClickSecteurAir?.canExecute) {
            const loadingMessage = `Navigation vers le détail air du secteur ${secteurName}`;
            executeAction(onClickSecteurAir, loadingMessage);
        }
    };

    // Calcul du grade DPE basé sur la consommation électrique
    const calculateDPEGrade = (value: number, period: 'day' | 'week' | 'month'): 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' => {
        // Définir les seuils de base pour une journée
        const dailyThresholds = {
            A: 200,    // <= 200 kWh/jour
            B: 400,    // 201-400 kWh/jour
            C: 600,    // 401-600 kWh/jour
            D: 800,    // 601-800 kWh/jour
            E: 1000,   // 801-1000 kWh/jour
            F: 1200    // 1001-1200 kWh/jour
                       // > 1200 kWh/jour = G
        };

        // Calculer le multiplicateur en fonction de la période
        const multiplier = period === 'day' ? 1 : 
                          period === 'week' ? 7 : 
                          30; // pour un mois

        // Calculer les seuils ajustés
        const adjustedThresholds = {
            A: dailyThresholds.A * multiplier,
            B: dailyThresholds.B * multiplier,
            C: dailyThresholds.C * multiplier,
            D: dailyThresholds.D * multiplier,
            E: dailyThresholds.E * multiplier,
            F: dailyThresholds.F * multiplier
        };

        // Déterminer le grade en fonction de la valeur
        if (value <= adjustedThresholds.A) return 'A';
        if (value <= adjustedThresholds.B) return 'B';
        if (value <= adjustedThresholds.C) return 'C';
        if (value <= adjustedThresholds.D) return 'D';
        if (value <= adjustedThresholds.E) return 'E';
        if (value <= adjustedThresholds.F) return 'F';
        return 'G';
    };

    return (
        <React.Fragment>
            {/* LoadingOverlay positioned outside the main content flow */}
            <LoadingOverlay isLoading={isLoading} message={message} />
            
            {/* Main content */}
            <div className="syntheseWidget-root max-w-full overflow-x-hidden p-4 sm:p-6 lg:p-8 font-sans space-y-6 sm:space-y-8 lg:space-y-10">
                {/* Date controls */}
                <div>
                    <DateRangeSelector
                        onClickDay={() => handleDateRangeChange('day')}
                        onClickWeek={() => handleDateRangeChange('week')}
                        onClickMonth={() => handleDateRangeChange('month')}
                        activeButton={activePeriod}
                        dateDebut={dateDebut.value}
                        dateFin={dateFin.value}
                    />
                </div>

                {/* DPE */}
                <div>
                    <DPE 
                        grade={calculateDPEGrade(usineData.consoElec.toNumber(), activePeriod)}
                        value={usineData.consoElec.toNumber()}
                        period={activePeriod}
                    />
                </div>

                {/* Cartes de consommation totale */}
                <div className="grid-responsive-4">
                    <CardConsoTotal
                        title="Électricité"
                        currentValue={usineData.consoElec}
                        previousValue={usineData.consoElecPrec}
                        unit="kWh"
                        type="electricity"
                    />
                    <CardConsoTotal
                        title="Gaz"
                        currentValue={usineData.consoGaz}
                        previousValue={usineData.consoGazPrec}
                        unit="m³"
                        type="gas"
                    />
                    <CardConsoTotal
                        title="Eau"
                        currentValue={usineData.consoEau}
                        previousValue={usineData.consoEauPrec}
                        unit="m³"
                        type="water"
                    />
                    <CardConsoTotal
                        title="Air"
                        currentValue={usineData.consoAir}
                        previousValue={usineData.consoAirPrec}
                        unit="m³"
                        type="air"
                    />
                </div>

                {/* Cartes de secteur */}
                <div className="grid-responsive-2">
                    {secteursData.map((secteur, index) => (
                        <SecteurConsoCard
                            key={index}
                            name={secteur.name}
                            consoElec={secteur.consoElec}
                            consoGaz={secteur.consoGaz}
                            consoEau={secteur.consoEau}
                            consoAir={secteur.consoAir}
                            consoElecPrec={secteur.consoElecPrec}
                            consoGazPrec={secteur.consoGazPrec}
                            consoEauPrec={secteur.consoEauPrec}
                            consoAirPrec={secteur.consoAirPrec}
                        />
                    ))}
                </div>

                {/* Graphiques de consommation par secteur */}
                <div className="grid-responsive-2">
                    <ColumnChart
                        data={secteursData}
                        title="Consommation Électricité par Secteur"
                        type="elec"
                        onClickSecteur={(secteurName) => handleSecteurElecClick(secteurName)}
                    />
                    <ColumnChart
                        data={secteursData}
                        title="Consommation Gaz par Secteur"
                        type="gaz"
                        onClickSecteur={(secteurName) => handleSecteurGazClick(secteurName)}
                    />
                </div>

                <div className="grid-responsive-2">
                    <ColumnChart
                        data={secteursData}
                        title="Consommation Eau par Secteur"
                        type="eau"
                        onClickSecteur={(secteurName) => handleSecteurEauClick(secteurName)}
                    />
                    <ColumnChart
                        data={secteursData}
                        title="Consommation Air par Secteur"
                        type="air"
                        onClickSecteur={(secteurName) => handleSecteurAirClick(secteurName)}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};
