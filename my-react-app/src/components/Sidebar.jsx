import "../Styles/sidebar.css";
function Sidebar({quests}) {
    
// make a function to add or remove quests or change status and call based on identified text prompts.
    // current status can be ongoing, failed, or completed.

    return(
            <div className="sideBarContainer">
                <h2>Quests</h2>
                {quests.map((quest) => (
                    <div key={quest.id} className={`quest-card ${quest.currentStatus.toLowerCase()}`}>
                        <h2>{quest.questName}</h2>
                        <p>{quest.questDescription}</p>
                        <p>{quest.currentStatus === "Failed" ? `-${quest.questWinLossPoints}` : `+${quest.questWinLossPoints}`} pts</p>
                    </div>
                ))}
            </div>
    )

}

export default Sidebar;

