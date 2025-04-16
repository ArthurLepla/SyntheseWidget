import { ReactElement, createElement } from "react";
import { Gauge } from "lucide-react";

export interface DPEProps {
    grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
    value: number;
    period: 'day' | 'week' | 'month';
}

interface DPEGrade {
    color: string;
    range: string;
    label: string;
    width: string;
    textColor?: string;
}

const getGradeRanges = (period: 'day' | 'week' | 'month'): Record<string, DPEGrade> => {
    // Multiplicateur selon la période
    const multiplier = period === 'day' ? 1 : period === 'week' ? 7 : 30;
    
    // Seuils de base journaliers
    const thresholds = {
        A: 200,
        B: 400,
        C: 600,
        D: 800,
        E: 1000,
        F: 1200
    };

    // Unité selon la période
    const unit = period === 'day' ? 'kWh/jour' : period === 'week' ? 'kWh/semaine' : 'kWh/mois';

    return {
        A: { 
            color: '#319834', 
            range: `≤ ${thresholds.A * multiplier} ${unit}`, 
            label: 'Très performant', 
            width: '30%' 
        },
        B: { 
            color: '#33CC33', 
            range: `${thresholds.A * multiplier + 1}-${thresholds.B * multiplier} ${unit}`, 
            label: 'Performant', 
            width: '40%' 
        },
        C: { 
            color: '#CBEF43', 
            range: `${thresholds.B * multiplier + 1}-${thresholds.C * multiplier} ${unit}`, 
            label: 'Assez performant', 
            width: '50%', 
            textColor: '#666666' 
        },
        D: { 
            color: '#FFF833', 
            range: `${thresholds.C * multiplier + 1}-${thresholds.D * multiplier} ${unit}`, 
            label: 'Peu performant', 
            width: '60%', 
            textColor: '#666666' 
        },
        E: { 
            color: '#FDD733', 
            range: `${thresholds.D * multiplier + 1}-${thresholds.E * multiplier} ${unit}`, 
            label: 'Peu performant', 
            width: '70%', 
            textColor: '#666666' 
        },
        F: { 
            color: '#FF9234', 
            range: `${thresholds.E * multiplier + 1}-${thresholds.F * multiplier} ${unit}`, 
            label: 'Très peu performant', 
            width: '80%' 
        },
        G: { 
            color: '#FF4234', 
            range: `> ${thresholds.F * multiplier} ${unit}`, 
            label: 'Non performant', 
            width: '90%' 
        }
    };
};

export const DPE = ({ grade, value, period }: DPEProps): ReactElement => {
    const DPE_GRADES = getGradeRanges(period);
    
    // Fonction pour formater la valeur énergétique avec l'unité appropriée
    const formatValueWithUnit = (val: number): { formattedValue: string, unit: string } => {
        if (val >= 1000000) {
            return {
                formattedValue: (val / 1000000).toFixed(1),
                unit: 'GWh'
            };
        } else if (val >= 1000) {
            return {
                formattedValue: (val / 1000).toFixed(1),
                unit: 'MWh'
            };
        } else {
            return {
                formattedValue: val.toFixed(1),
                unit: 'kWh'
            };
        }
    };
    
    const getPeriodSuffix = (): string => {
        switch (period) {
            case 'day': return '/jour';
            case 'week': return '/semaine';
            case 'month': return '/mois';
            default: return '';
        }
    };

    // Formatage de la valeur pour l'affichage
    const { formattedValue, unit } = formatValueWithUnit(value);
    const valueDisplay = `${formattedValue} ${unit}${getPeriodSuffix()}`;

    return (
        <div className="card-base">
            <div className="card-header">
                <div className="icon-container bg-[#18213e]/10">
                    <Gauge className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-[#18213e]" />
                </div>
                <h3 className="title-medium">Diagnostic de Performance Énergétique</h3>
            </div>
            
            <div className="mt-8">
                {Object.entries(DPE_GRADES).map(([key, { color, range, label, width, textColor }]) => {
                    const isActiveGrade = key === grade;
                    
                    return (
                        <div key={key} className="flex mb-3">
                            {/* Grade label */}
                            <div className="w-8 text-xl font-bold flex items-center justify-center mr-4">{key}</div>
                            
                            {/* Main content area */}
                            <div className="flex-1">
                                <div className="flex items-center">
                                    {/* DPE Bar */}
                                    <div 
                                        style={{ 
                                            backgroundColor: color,
                                            width: width,
                                            display: 'inline-block'
                                        }}
                                        className="h-12 rounded-lg flex items-center justify-between px-4"
                                    >
                                        <span className="font-medium text-lg whitespace-nowrap" style={{ color: textColor || 'white' }}>{label}</span>
                                        <span className="font-medium text-lg whitespace-nowrap" style={{ color: textColor || 'white' }}>{range}</span>
                                    </div>
                                    
                                    {/* Badge - shown inline right after the bar */}
                                    {isActiveGrade && (
                                        <div 
                                            style={{ 
                                                color: color,
                                                border: `2px solid ${color}`,
                                                backgroundColor: 'white',
                                                marginLeft: '8px',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                borderRadius: '9999px',
                                                padding: '6px 12px',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            <div 
                                                style={{ 
                                                    backgroundColor: color,
                                                    width: '12px',
                                                    height: '12px', 
                                                    borderRadius: '50%',
                                                    marginRight: '8px',
                                                    flexShrink: 0
                                                }}
                                            ></div>
                                            <span style={{ whiteSpace: 'nowrap' }}>{valueDisplay}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-6 text-lg text-gray-700 font-medium text-center">
                Niveau actuel : <span className="font-bold" style={{ color: DPE_GRADES[grade].color }}>{DPE_GRADES[grade].label} ({grade})</span>
            </div>
        </div>
    );
};