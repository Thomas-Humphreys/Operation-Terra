import "../Styles/sidebar.css";
function Sidebar() {
    const Quests =[
        {
            id: 0,
            questName: "Recycle",
            questDescription: "blah blah",
            questWinLossPoints: 20,
            currentStatus: "Ongoing"
        },
         {
            id: 1,
            questName: "Learn about deforistation",
            questDescription: "blah blah",
            questWinLossPoints: 40,
            currentStatus: "Complete"
        }
    ]
    // current status can be ongoing, failed, or completed.

    return(
            <div className="CardContainer">
                {}
            </div>
    )

}

export default Sidebar;

// add in settings 