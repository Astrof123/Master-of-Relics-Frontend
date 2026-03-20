import DraftArtifacts from "../draft-artifacts/DraftArtifacts";
import DraftedArtifacts from "../drafted-artifacts/DraftedArtifacts";
import clsx from "clsx";
import styles from "./DraftScreen.module.css";

function DraftScreen() {    
    return (
        <div className={clsx(styles["draft-content"])}>
            <DraftArtifacts />
            <DraftedArtifacts />
        </div>
    );
}

export default DraftScreen;