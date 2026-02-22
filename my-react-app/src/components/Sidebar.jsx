import "../Styles/sidebar.css";
function Sidebar() {
    const quests =[
        {
            id: 0,
            questName: "Recycle Right",
            questDescription: "Sort your household waste correctly today, making sure all recyclables go in the right bin.",
            questWinLossPoints: 10,
            currentStatus: "Ongoing"
        },
        {
            id: 1,
            questName: "Bag for Life",
            questDescription: "Do your shopping today using only reusable bags, no plastic bags allowed.",
            questWinLossPoints: 10,
            currentStatus: "Complete"
        },
        {
            id: 2,
            questName: "Lights Out",
            questDescription: "Turn off every light and plug off every unused device before you go to bed tonight.",
            questWinLossPoints: 10,
            currentStatus: "Failed"
        },
        {
            id: 3,
            questName: "Litter Pick",
            questDescription: "Pick up 10 pieces of litter on your next walk outside.",
            questWinLossPoints: 15,
            currentStatus: "Complete"
        },
        {
            id: 4,
            questName: "Meatless Meal",
            questDescription: "Cook and eat a fully plant-based meal today.",
            questWinLossPoints: 10,
            currentStatus: "Ongoing"
        },
        {
            id: 5,
            questName: "Short Shower",
            questDescription: "Keep your shower under 4 minutes today.",
            questWinLossPoints: 10,
            currentStatus: "Complete"
        },
        {
            id: 6,
            questName: "Walk It",
            questDescription: "Replace one car or bus journey today with walking or cycling.",
            questWinLossPoints: 15,
            currentStatus: "Ongoing"
        },
        {
            id: 7,
            questName: "Tap Off",
            questDescription: "Turn the tap off while brushing your teeth every time today.",
            questWinLossPoints: 5,
            currentStatus: "Complete"
        },
        {
            id: 8,
            questName: "Donate a Item",
            questDescription: "Find one item of clothing or household goods you no longer need and set it aside to donate.",
            questWinLossPoints: 10,
            currentStatus: "Ongoing"
        },
        {
            id: 9,
            questName: "Learn Something",
            questDescription: "Read or watch one short article or video about an environmental issue today.",
            questWinLossPoints: 5,
            currentStatus: "Failed"
        },
        {
            id: 10,
            questName: "Leftover Lunch",
            questDescription: "Use up leftover food for your lunch instead of buying something new.",
            questWinLossPoints: 10,
            currentStatus: "Complete"
        },
        {
            id: 11,
            questName: "Reusable Cup",
            questDescription: "Use a reusable cup or bottle for all your drinks today, no disposables.",
            questWinLossPoints: 10,
            currentStatus: "Ongoing"
        },
        {
            id: 12,
            questName: "Cold Wash",
            questDescription: "Do your laundry on a cold cycle today instead of a hot one.",
            questWinLossPoints: 10,
            currentStatus: "Complete"
        },
        {
            id: 13,
            questName: "Screen Free Hour",
            questDescription: "Spend an hour outside in nature today with your phone put away.",
            questWinLossPoints: 10,
            currentStatus: "Ongoing"
        },
        {
            id: 14,
            questName: "Fix Don't Chuck",
            questDescription: "Repair something that is broken instead of throwing it away.",
            questWinLossPoints: 15,
            currentStatus: "Failed"
        },
        {
            id: 15,
            questName: "Plastic Audit",
            questDescription: "Count how many single-use plastics you use today and write down one swap you could make.",
            questWinLossPoints: 5,
            currentStatus: "Complete"
        },
        {
            id: 16,
            questName: "Second Hand Find",
            questDescription: "Next time you need something, check a charity shop or second hand site before buying new.",
            questWinLossPoints: 15,
            currentStatus: "Ongoing"
        },
        {
            id: 17,
            questName: "Plant a Seed",
            questDescription: "Plant one seed or cutting in a pot today, anything counts.",
            questWinLossPoints: 15,
            currentStatus: "Complete"
        },
        {
            id: 18,
            questName: "Inbox Detox",
            questDescription: "Unsubscribe from 5 email lists you never read to reduce your digital carbon footprint.",
            questWinLossPoints: 5,
            currentStatus: "Ongoing"
        },
        {
            id: 19,
            questName: "Spread the Word",
            questDescription: "Tell a friend or family member one interesting environmental fact you learned recently.",
            questWinLossPoints: 5,
            currentStatus: "Complete"
        }
];
// make a function to add or remove quests or change status and call based on identified text prompts.
    // current status can be ongoing, failed, or completed.

    return(
            <div className="sideBarContainer">
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

// add in settings 