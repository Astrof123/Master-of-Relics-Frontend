import CreateLobby from "@/features/lobby/components/create-lobby/CreateLobby";
import { useLobbySocket } from "@/features/lobby/hooks/useLobbySocket";

function CreateLobbyPage() {
    const { 
        createLobby, 
    } = useLobbySocket();

    return ( 
        <>
            <CreateLobby onCreateLobby={createLobby} />
        </>
    );
}

export default CreateLobbyPage;