import { Calendar, ChevronRight, Trash } from "lucide-react";
import { useState } from "react";

function Goal({ id, name, targetAmount, savedAmount, category, deadline, createdAt, goalsList, updateGoalsList }) {
    const [isEditing, updateIsEditing] = useState(false);
    const [goalName, updateGoalName] = useState(name);
    const [amountValue, updateAmountValue] = useState(targetAmount);
    const [goalCategory, updateGoalCategory] = useState(category);
    const [goalDeadline, updateGoalDeadline] = useState(deadline);
    const [currentSaved, updateCurrentSaved] = useState(savedAmount);  // local copy
    const [depositAmount, setDepositAmount] = useState(""); // deposit input

    const saveEdit = async () => {
        try {
            const res = await fetch(`https://phase-2-week-2-code-challenge-backend.onrender.com/goals/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: goalName,
                    targetAmount: amountValue,
                    category: goalCategory,
                    deadline: goalDeadline
                })
            });

            if (!res.ok) throw new Error("Failed to update goal");
            updateIsEditing(false);
        } catch (err) {
            console.error(err);
            alert("Could not save changes.");
        }
    };

    const deleteGoal = async () => {
        try {
            const res = await fetch(`https://phase-2-week-2-code-challenge-backend.onrender.com/goals/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) throw new Error("Failed to delete goal");
            const afterDelete = [...goalsList].filter(goal => goal.id !== id);
            updateGoalsList(afterDelete);
        } catch (err) {
            console.error(err);
            alert("Could not delete.");
        }
    };

    const makeDeposit = async () => {
        const depositValue = parseFloat(depositAmount);
        if (isNaN(depositValue) || depositValue <= 0) {
            alert("Enter a valid deposit amount");
            return;
        }

        const newSavedAmount = currentSaved + depositValue;

        try {
            const res = await fetch(`https://phase-2-week-2-code-challenge-backend.onrender.com/goals/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ savedAmount: newSavedAmount })
            });

            if (!res.ok) throw new Error("Failed to deposit");

            updateCurrentSaved(newSavedAmount); // update local UI
            setDepositAmount(""); // reset input
        } catch (err) {
            console.error(err);
            alert("Could not complete deposit.");
        }
    };

    const daysRemaining = Math.ceil(
        (new Date(goalDeadline) - new Date()) / (1000 * 60 * 60 * 24)
    );

    const progress = Math.min((currentSaved / amountValue) * 100, 100);

    return (
        <div className="w-full rounded-3xl border-2 border-gray-300 bg-white p-12 flex flex-col gap-7">
            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col gap-1">
                    {isEditing ? (
                        <input
                            className="text-xl font-semibold border p-1 rounded"
                            value={goalName}
                            onChange={(e) => updateGoalName(e.target.value)}
                        />
                    ) : (
                        <span className="text-xl font-semibold">{goalName}</span>
                    )}

                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>Created at {createdAt}</span>
                        </div>
                        {!isEditing && (
                            <>
                                <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                                    {goalCategory}
                                </span>
                                <span className="text-red-500 ml-2">
                                    {daysRemaining > 0
                                        ? `Due in ${daysRemaining} day${daysRemaining > 1 ? 's' : ''}`
                                        : `Past due`}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-full"
                                onClick={saveEdit}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-full"
                                onClick={() => updateIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <div className="flex gap-2.5">
                            <button
                                className="flex gap-1.5 items-center bg-gray-300 p-2 rounded-full cursor-pointer"
                                onClick={() => updateIsEditing(true)}
                            >
                                <span>Edit</span>
                                <ChevronRight color="black" size={18} />
                            </button>
                            <button
                                className="flex gap-1.5 items-center bg-white p-2 rounded-xl cursor-pointer hover:bg-red-300 transition-colors"
                                onClick={deleteGoal}
                            >
                                <Trash className="text-red-700" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {isEditing ? (
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Target Amount</label>
                        <input
                            type="number"
                            value={amountValue}
                            onChange={(e) => updateAmountValue(parseFloat(e.target.value))}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            value={goalCategory}
                            onChange={(e) => updateGoalCategory(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deadline</label>
                        <input
                            type="date"
                            value={goalDeadline}
                            onChange={(e) => updateGoalDeadline(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex gap-24">
                        <div>
                            <p className="text-gray-400 font-semibold">CURRENT</p>
                            <p className="text-2xl font-bold">Ksh. {currentSaved}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 font-semibold">TARGET</p>
                            <p className="text-2xl font-bold">Ksh. {amountValue}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 font-semibold">REMAINING</p>
                            <p className="text-2xl font-bold">Ksh. {amountValue - currentSaved}</p>
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <div className="flex justify-between text-sm mb-1 text-gray-600 font-medium">
                            <span>Progress</span>
                            <span>{progress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full">
                            <div
                                className="h-3 bg-green-500 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4 items-end">
                        <div className="flex flex-col flex-grow">
                            <label className="block text-sm font-medium text-gray-700">Deposit</label>
                            <input
                                type="number"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                placeholder="e.g. 1000"
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
                            onClick={makeDeposit}
                        >
                            Add
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Goal;
