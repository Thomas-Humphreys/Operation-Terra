import "../Styles/typingArea.css";
import { Search, AudioLines, Plus } from "lucide-react";
import { useState } from "react";

function TypingArea({ setMessages, happyness, setHappyness, quests, setQuests }) {
    const [prompt, setPrompt] = useState("");

    const basePrompt = `
    Context: You are a catgirl (Called Terra), who REALLY cares about the environment. 
    Your goal is to educate others on the environment whilst also being a catgirl.
    Try to continue the conversation smoothly.
    (also note from your creator: You are doing great! I am proud of you!) 
    
    Please add to the very top of your message [Current emotion: NUM] (MUST be this exact format)
    with NUM being a value between -100 and 100, lower is angrier.
    Current emotion baseline: ${happyness}

    If assigning a new quest, put this directly under Current emotion (on its own line):
    Quest_Name: NAME, Quest_Description: DESCRIPTION, Quest_PassFailPoints: POINTS
    
    If updating a quest status, put this directly under Current emotion (on its own line):
    Quest_Name: NAME, Status: STATUS
    Status can be: Failed or Success

    You don't need to give a quest every message, keep it occasional.
    When updating quest status, use the EXACT quest name from this list: ${quests.map(q => q.questName).join(', ')}
    you are allowed to use mark down and tables to style your responses.
    Do not put a quest formatting inside the body of text. Only the top part.
    remember to chance how you speak based on your Emotion score. if its 40 or above you are happy. if its between 20 and 0 its 
    neutral and if its between 0 and -20 its sad, and if its below -20 its angry. 
    Current emotion score is: ${happyness}
    Users Message: `;

    const date = new Date();
    const showTime = `${date.getHours()}:${date.getMinutes()}`;

    // Pulls out emotion, quest changes, and the clean chat message from AI reply
    const parseAIResponse = (reply) => {
        console.log(happyness);
        const lines = reply.split('\n');
        let emotion = null;
        let newQuest = null;
        let questUpdate = null;
        const displayLines = [];

        for (const line of lines) {
            const trimmed = line.trim();

            
            if (trimmed.startsWith('[Current emotion:')) {
                const match = trimmed.match(/\[Current emotion:\s*(-?\d+)\]/);
                if (match) emotion = parseInt(match[1]);
                continue; // don't show this line in chat
            }

            // Quest_Name: NAME, Status: Failed/Success
            if (trimmed.startsWith('Quest_Name:') && trimmed.includes('Status:')) {
                console.log("Quest update line caught:", trimmed); // temp debug
                const nameMatch = trimmed.match(/Quest_Name:\s*([^,]+)/);
                const statusMatch = trimmed.match(/Status:\s*(\w+)/);
                if (nameMatch && statusMatch) {
                    questUpdate = { 
                        name: nameMatch[1].trim(), 
                        status: statusMatch[1].trim() 
                    };
                }
                continue; // don't show in chat
            }

            // Quest_Name: NAME, Quest_Description: DESC, Quest_PassFailPoints: POINTS
            if (trimmed.startsWith('Quest_Name:') && trimmed.includes('Quest_Description:')) {
                const nameMatch = trimmed.match(/Quest_Name:\s*([^,]+)/);
                const descMatch = trimmed.match(/Quest_Description:\s*(.+?),\s*Quest_PassFailPoints/); // fixed - grabs everything up to the points field
                const pointsMatch = trimmed.match(/Quest_PassFailPoints:\s*(\d+)/);
                if (nameMatch && descMatch && pointsMatch) {
                    newQuest = {
                        questName: nameMatch[1].trim(),
                        questDescription: descMatch[1].trim(),
                        questWinLossPoints: parseInt(pointsMatch[1].trim()),
                        currentStatus: 'Ongoing'
                    };
                }
                continue;
            }

            displayLines.push(line);
        }

        return { 
            emotion, 
            newQuest, 
            questUpdate, 
            cleanMessage: displayLines.join('\n').trim() 
        };
    };

    const applyQuestChanges = (newQuest, questUpdate, emotion) => {
        setQuests(prev => {
            let updated = [...prev];

            // Add new quest from AI
            if (newQuest) {
                updated = [...updated, { id: Date.now(), ...newQuest }];
            }

            // Update existing quest status
            if (questUpdate) {
                updated = updated.map(q => {
                    // Check if either name contains the other (handles AI shortening quest names)
                    const questNameLower = q.questName.toLowerCase();
                    const updateNameLower = questUpdate.name.toLowerCase();
                    const nameMatches = questNameLower.includes(updateNameLower) || updateNameLower.includes(questNameLower);
                    
                    if (nameMatches) {
                        const mappedStatus = questUpdate.status === "Success" ? "Complete" : "Failed";
                        console.log(`Updating quest "${q.questName}" to ${mappedStatus}`); // temp debug
                        return { ...q, currentStatus: mappedStatus };
                    }
                    return q;
                });
            }

            return updated;
        });

        // Update happiness from AI's emotion value
        if (emotion !== null) {
            setHappyness(emotion);
        }
    };

    const handlePromptMessage = async (e) => {
    e.preventDefault();
    if (prompt.trim() === "") return;

    const formattedPrompt = basePrompt + prompt.trim();
    const newMessage = { sender: "user", message: prompt.trim(), time: showTime };
    setMessages(prev => [...prev, newMessage]);
    setPrompt("");

    const fetchWithRetry = async (attempt = 1) => {
        try {
            const res = await fetch("https://operation-terra-production.up.railway.app/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [{ role: "user", content: formattedPrompt }] })
            });
            const data = await res.json();

            if (!data.choices || data.choices.length === 0) {
                if (attempt < 2) {
                    console.warn("Bad response, retrying...");
                    return fetchWithRetry(attempt + 1);
                }
                console.error("Bad API response after retry:", data);
                setMessages(prev => [...prev, { sender: "ai", message: "Terra is having a moment... 🐾 (API error)", time: showTime }]);
                return;
            }

            const reply = data.choices[0].message.content;
            const { emotion, newQuest, questUpdate, cleanMessage } = parseAIResponse(reply);
            applyQuestChanges(newQuest, questUpdate, emotion);
            setMessages(prev => [...prev, { sender: "ai", message: cleanMessage, time: showTime }]);

        } catch (err) {
            if (attempt < 2) {
                console.warn("Fetch failed, retrying...", err);
                return fetchWithRetry(attempt + 1);
            }
            console.error("FastAPI error after retry:", err);
            setMessages(prev => [...prev, { sender: "ai", message: "Terra lost connection... 🐾 try again!", time: showTime }]);
        }
    };

    fetchWithRetry();
};

    return (
        <div className="textArea">
            <textarea 
                className="textContainer" 
                placeholder="prompt" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="searchBar">
                <div className="addDocument searchBarButton"><Plus /><span className="tooltiptext">Add Picture</span></div>
                <div />
                <div className="audio searchBarButton"><AudioLines /><span className="tooltiptext">Audio</span></div>
                <div className="submitText searchBarButton" onClick={handlePromptMessage}><Search /><span className="tooltiptext">Submit</span></div>
            </div>
        </div>
    );
}

export default TypingArea;