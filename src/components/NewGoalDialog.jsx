import { useState } from "react";

function NewGoalDialog({ goalsList, updateGoalsList, isClicked, updateIsClicked }) {
    const [goalName, updateGoalName] = useState("");
    const [targetAmount, updateTargetAmount] = useState(1);
    const [category, updateCategory] = useState("");
    const [deadline, updateDeadline] = useState("");
    
    function createGoal() {
        let newGoalsList = [...goalsList]
        const year = new Date().getFullYear();
        const month = (new Date().getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed, so add 1. padStart ensures two digits.
        const day = new Date().getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        if (goalName.trim() !== "" && targetAmount !== 0 && category.trim() !== "" && deadline.trim() !== "") {
            const data = {
                name: goalName,
                targetAmount: targetAmount,
                savedAmount: 0,
                category: category,
                deadline: deadline,
                createdAt: formattedDate,
            };

            fetch("https://phase-2-week-2-code-challenge-backend.onrender.com/goals/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(newGoal => {
                newGoalsList.push(newGoal);
                updateGoalsList(newGoalsList);
            });
        }
    }

    return (
        <div 
        className={`absolute z-50 ${isClicked ? "block" : "hidden"} w-full h-screen bg-black/45 flex justify-center items-center`}
        >
            <div className="w-2xl rounded-3xl bg-white p-7">
                <p className="text-3xl font-semibold py-5">Create a new goal</p>
                <form className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="goal-name">Goal Name</label>
                        <input
                         value={goalName}
                         onChange={(e) => updateGoalName(e.target.value)}
                         id="goal-name" 
                         type="text" 
                         className="outline-2 outline-gray-300 p-2 rounded focus:outline-gray-400"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="target-amount">Target Amount</label>
                        <input
                         value={targetAmount}
                         onChange={(e) => updateTargetAmount(e.target.value)}
                         id="target-amount"
                         type="number" 
                         min={1} 
                         className="outline-2 outline-gray-300 p-2 rounded focus:outline-gray-400"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">Category</label>
                        <input
                         value={category}
                         onChange={(e) => updateCategory(e.target.value)}
                         id="category"
                         type="text" 
                         className="outline-2 outline-gray-300 p-2 rounded focus:outline-gray-400"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="deadline">Deadline</label>
                        <input
                         value={deadline}
                         onChange={(e) => updateDeadline(e.target.value)}
                         id="deadline"
                         type="date"
                         className="outline-2 outline-gray-300 p-2 rounded focus:outline-gray-400"
                        />
                    </div>
                    <div className="flex justify-between pt-7">
                        <button 
                            className="cursor-pointer bg-red-300 p-3 rounded-xl text-grredeen-900 font-semibold" 
                            onClick={(e) => {
                                e.preventDefault();
                                updateIsClicked(false);
                            }}
                        >
                            Cancel
                        </button>
                        <button 
                         className="cursor-pointer bg-green-300 p-3 rounded-xl text-green-900 font-semibold"
                         type="submit"
                         onClick={(e) => {
                            e.preventDefault();
                            createGoal();
                            updateGoalName("")
                            updateTargetAmount(0)
                            updateCategory("")
                            updateDeadline("")
                            updateIsClicked(false);
                         }}
                        >Create Goal</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewGoalDialog;