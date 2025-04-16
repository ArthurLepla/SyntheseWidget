/**
 * This file was generated from SyntheseWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface SyntheseWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    dsUsine: ListValue;
    attrTotalConsoElec: ListAttributeValue<Big>;
    attrTotalConsoGaz: ListAttributeValue<Big>;
    attrTotalConsoEau: ListAttributeValue<Big>;
    attrTotalConsoAir: ListAttributeValue<Big>;
    attrTotalConsoElecPeriodPrec: ListAttributeValue<Big>;
    attrTotalConsoGazPeriodPrec: ListAttributeValue<Big>;
    attrTotalConsoEauPeriodPrec: ListAttributeValue<Big>;
    attrTotalConsoAirPeriodPrec: ListAttributeValue<Big>;
    dsSecteurs: ListValue;
    attrSecteurNom: ListAttributeValue<string>;
    attrSecteurConsoElec: ListAttributeValue<Big>;
    attrSecteurConsoGaz: ListAttributeValue<Big>;
    attrSecteurConsoEau: ListAttributeValue<Big>;
    attrSecteurConsoAir: ListAttributeValue<Big>;
    attrSecteurConsoElecPrec: ListAttributeValue<Big>;
    attrSecteurConsoGazPrec: ListAttributeValue<Big>;
    attrSecteurConsoEauPrec: ListAttributeValue<Big>;
    attrSecteurConsoAirPrec: ListAttributeValue<Big>;
    dateDebut: EditableValue<Date>;
    dateFin: EditableValue<Date>;
    onClickDay?: ActionValue;
    onClickWeek?: ActionValue;
    onClickMonth?: ActionValue;
    onClickSecteurElec?: ActionValue;
    onClickSecteurGaz?: ActionValue;
    onClickSecteurEau?: ActionValue;
    onClickSecteurAir?: ActionValue;
}

export interface SyntheseWidgetPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    dsUsine: {} | { caption: string } | { type: string } | null;
    attrTotalConsoElec: string;
    attrTotalConsoGaz: string;
    attrTotalConsoEau: string;
    attrTotalConsoAir: string;
    attrTotalConsoElecPeriodPrec: string;
    attrTotalConsoGazPeriodPrec: string;
    attrTotalConsoEauPeriodPrec: string;
    attrTotalConsoAirPeriodPrec: string;
    dsSecteurs: {} | { caption: string } | { type: string } | null;
    attrSecteurNom: string;
    attrSecteurConsoElec: string;
    attrSecteurConsoGaz: string;
    attrSecteurConsoEau: string;
    attrSecteurConsoAir: string;
    attrSecteurConsoElecPrec: string;
    attrSecteurConsoGazPrec: string;
    attrSecteurConsoEauPrec: string;
    attrSecteurConsoAirPrec: string;
    dateDebut: string;
    dateFin: string;
    onClickDay: {} | null;
    onClickWeek: {} | null;
    onClickMonth: {} | null;
    onClickSecteurElec: {} | null;
    onClickSecteurGaz: {} | null;
    onClickSecteurEau: {} | null;
    onClickSecteurAir: {} | null;
}
