import CurrentLobby from "@/features/lobby/components/current-lobby/CurrentLobby";
import ContentLayout from "@/widgets/content-layout/ContentLayout";

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