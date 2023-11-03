import React from 'react';
import styles from './styles.module.css';

export default function AthleteResults(props) {
    const { athlete } = props;
    const resultsMap = athlete.map((result, index) => {
        return (
            <div key={index} className={styles.singleResult}>
                <div className={styles.tableHeaderLabelSmallBold}>
                    {result.mark}
                </div>
                <div className={styles.tableHeaderLabelSmall}>
                    {result.discipline}
                </div>
                <div className={styles.tableHeaderLabelLarge}>
                    {result.venue}
                </div>
                <div className={styles.tableHeaderLabelSmallDate}>
                    {result.date}
                </div>
            </div>
        )
    }
    )
    return (
        <div className={styles.tableHolder}>
            <div className={styles.tableHeader}>
                [Latest Results]
            </div>
            <div className={styles.tableHeaderLabels}>
                <div className={styles.tableHeaderLabelSmallLabel}>
                    Time
                </div>
                <div className={styles.tableHeaderLabelSmall}>
                    Event
                </div>
                <div className={styles.tableHeaderLabelLarge}>
                    Location
                </div>
                <div className={styles.tableHeaderLabelSmall}>
                    Date
                </div>
            </div>
            <div className={styles.resultHolder}>
                {resultsMap}
            </div>
        </div>
    )
}