import LobbyList from "../features/lobby/components/lobby-list/LobbyList";
import ContentLayout from "@/widgets/content-layout/ContentLayout";


function MainPage() {
    return (
        <ContentLayout>
            <>
                <h1>Список лобби</h1>
                <LobbyList />
            </>
        </ContentLayout>
    );
}

export default MainPage;