// function PlayerLobbyPage() {
//     return (  
//         <>
//             <div key={lobby.id} className={styles.lobbyCard}>
//                 <div className={styles.lobbyName}>{lobby.name}</div>
                
//                 <div className={clsx(styles.lobbyState, getStateClass(lobby.state))}>
//                     {lobby.state}
//                 </div>
                
//                 <div className={styles.playersList}>
//                     Игроки:
//                     <div>
//                         {Object.values(lobby.players).map((player: LobbyPlayer) => (
//                             <span key={player.id} className={styles.playerItem}>
//                                 {player.nickname}
//                                 {player.isReady ? "✅️" : "❌"}
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//                 {renderButtons(lobby)}
//             </div>     
//         </>
//     );
// }

// export default PlayerLobbyPage;