import CreateLobby from "@/features/lobby/components/create-lobby/CreateLobby";
import { useLobbySocket } from "@/features/lobby/hooks/useLobbySocket";
import ContentLayout from "@/widgets/content-layout/ContentLayout";

function CreateLobbyPage() {
    const { 
        createLobby, 
    } = useLobbySocket();

    return ( 
        <ContentLayout>
            <>
                <CreateLobby onCreateLobby={createLobby} />
            </>
        </ContentLayout>
    );
}

export default CreateLobbyPage;