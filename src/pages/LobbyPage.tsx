import CurrentLobby from "@/features/lobby/components/current-lobby/CurrentLobby";
import ContentLayout from "@/widgets/Contentlayout/ContentLayout";

function LobbyPage() {
    return ( 
        <ContentLayout>
            <>
                <CurrentLobby />
            </>
        </ContentLayout>
    );
}

export default LobbyPage;