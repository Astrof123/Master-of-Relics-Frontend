import LobbyList from "../features/lobby/components/lobby-list/LobbyList";
import ContentLayout from "@/widgets/Contentlayout/ContentLayout";


function MainPage() {
    return (
        <ContentLayout>
            <>
                <h1>Главная страница</h1>
                <LobbyList />
            </>
        </ContentLayout>
    );
}

export default MainPage;