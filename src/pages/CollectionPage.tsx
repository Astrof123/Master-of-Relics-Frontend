import { ARTIFACTS } from "@/features/game/constants/artifacts";
import ContentLayout from "@/widgets/content-layout/ContentLayout";

function CollectionPage() {
    return ( 
        <ContentLayout>
            <div className="pudge">
                {Object.values(ARTIFACTS).map((artifact) => (
                    <img src={artifact.imgCard} alt="" />
                ))}
            </div>
            <style>{`
                .pudge {
                    display: flex;
                    gap: 8px;
                }
            `}</style>
        </ContentLayout>
        
    );
}

export default CollectionPage;