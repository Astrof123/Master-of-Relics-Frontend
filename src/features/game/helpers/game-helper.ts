export class GameHelper {
    static getStylesForCornerValues(styles: CSSModuleClasses, valueLeftTop: number | null, valueRightTop: number | null, isArtifact: boolean) {
        const valueLeftTopStyles = [styles["value-left-top"]];
        
        if (isArtifact) {
            if (valueLeftTop !== null && valueLeftTop >= 100) {
                valueLeftTopStyles.push(styles["value-left-top--high"]);
            }
            if (valueLeftTop !== null && valueLeftTop < 100) {
                valueLeftTopStyles.push(styles["value-left-top--low"]);
            }
            if (valueLeftTop !== null && valueLeftTop < 10) {
                valueLeftTopStyles.push(styles["value-left-top--very-low"]);
            }
        }
        else {
            if (valueLeftTop !== null && valueLeftTop >= 100) {
                valueLeftTopStyles.push(styles["value-left-top--high--spell"]);
            }
            if (valueLeftTop !== null && valueLeftTop < 100) {
                valueLeftTopStyles.push(styles["value-left-top--low--spell"]);
            }
            if (valueLeftTop !== null && valueLeftTop < 10) {
                valueLeftTopStyles.push(styles["value-left-top--very-low--spell"]);
            }    
        }


        const valueRightTopStyles = [styles["value-right-top"]];

        if (valueRightTop !== null && valueRightTop >= 100) {
            valueRightTopStyles.push(styles["value-right-top--high"]);
        }
        if (valueRightTop !== null && valueRightTop < 100) {
            valueRightTopStyles.push(styles["value-right-top--low"]);
        }
        if (valueRightTop !== null && valueRightTop < 10) {
            valueRightTopStyles.push(styles["value-right-top--very-low"]);
        }

        return [valueLeftTopStyles, valueRightTopStyles];
    }
}