import { Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";

function Goal({ id, name, targetAmount, savedAmount, category, deadline, createdAt }) {
    const [isEditing, updateIsEditing] = useState(false);
    const [goalName, updateGoalName] = useState(name);
    const [amountValue, updateAmountValue] = useState(targetAmount);
    const [goalCategory, updateGoalCategory] = useState(category);
    const [goalDeadline, updateGoalDeadline] = useState(deadline);

    const saveEdit = async () => {
        try {
            const res = await fetch(`http://localhost:3000/goals/${id}`, {
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

    const daysRemaining = Math.ceil(
        (new Date(goalDeadline) - new Date()) / (1000 * 60 * 60 * 24)
    );

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
                        <button
                            className="flex gap-1.5 items-center bg-gray-300 p-2 rounded-full cursor-pointer"
                            onClick={() => updateIsEditing(true)}
                        >
                            <span>Edit</span>
                            <ChevronRight color="black" size={18} />
                        </button>
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
                <div className="flex gap-24">
                    <div>
                        <p className="text-gray-400 font-semibold">CURRENT</p>
                        <p className="text-2xl font-bold">Ksh. {savedAmount}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 font-semibold">TARGET</p>
                        <p className="text-2xl font-bold">Ksh. {amountValue}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 font-semibold">REMAINING</p>
                        <p className="text-2xl font-bold">Ksh. {amountValue - savedAmount}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Goal;
