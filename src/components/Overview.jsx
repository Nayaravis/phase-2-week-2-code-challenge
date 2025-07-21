import { DollarSign, Target, TrendingUp, AlarmClock, AlertTriangle, CheckCircle } from "lucide-react";

function OverviewSection({ goals }) {
    const now = new Date();

    const totalAccumulated = goals.reduce((acc, curr) => acc + curr.savedAmount, 0);
    console.log(totalAccumulated)

    const totalTargetAmount = goals.reduce((acc, curr) => acc + curr.targetAmount, 0);

    const totalProgress = totalTargetAmount > 0
        ? Math.floor((totalAccumulated / totalTargetAmount) * 100)
        : 0;

    const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount);

    const goalStatuses = goals.map(goal => {
        const deadline = new Date(goal.deadline);
        const daysRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
        const isComplete = goal.savedAmount >= goal.targetAmount;
        const isOverdue = !isComplete && daysRemaining < 0;
        const isNearDeadline = !isComplete && daysRemaining <= 30 && daysRemaining >= 0;

        return {
            name: goal.name,
            daysRemaining,
            isComplete,
            isOverdue,
            isNearDeadline
        };
    });

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex justify-between w-full">
                <div className="p-7 border-2 border-gray-300 rounded-2xl w-96">
                    <div className="flex justify-between w-full items-center">
                        <DollarSign color="green" size={36} />
                        <span className="text-gray-600 bg-gray-300 p-1 px-2 rounded-full text-sm">SAVED</span>
                    </div>
                    <div className="text-3xl font-bold">{totalAccumulated}</div>
                    <p className="text-gray-500">Total accumulated</p>
                </div>

                <div className="p-7 border-2 border-gray-300 rounded-2xl w-96">
                    <div className="flex justify-between w-full items-center">
                        <Target color="blue" size={36} />
                        <span className="text-gray-600 bg-gray-300 p-1 px-2 rounded-full text-sm">TARGET</span>
                    </div>
                    <div className="text-3xl font-bold">{totalTargetAmount}</div>
                    <p className="text-gray-500">Combined objectives</p>
                </div>

                <div className="p-7 border-2 border-gray-300 rounded-2xl w-96">
                    <div className="flex justify-between w-full items-center">
                        <TrendingUp className="text-blue-600" size={36} />
                        <span className="text-gray-600 bg-gray-300 p-1 px-2 rounded-full text-sm">PROGRESS</span>
                    </div>
                    <div className="text-3xl font-bold">{totalProgress}%</div>
                    <p className="text-gray-500">Overall Completion</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6 w-full">
                <div className="border-2 border-gray-300 p-6 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <AlarmClock className="text-indigo-600" />
                        <span className="text-lg font-semibold">Total Goals</span>
                    </div>
                    <p className="text-2xl mt-2 font-bold">{goals.length}</p>
                </div>

                <div className="border-2 border-gray-300 p-6 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-600" />
                        <span className="text-lg font-semibold">Completed Goals</span>
                    </div>
                    <p className="text-2xl mt-2 font-bold">{completedGoals.length}</p>
                </div>

                <div className="border-2 border-gray-300 p-6 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="text-yellow-600" />
                        <span className="text-lg font-semibold">Warnings & Overdue</span>
                    </div>
                    <p className="text-2xl mt-2 font-bold">
                        {
                            goalStatuses.filter(
                                g => g.isNearDeadline || g.isOverdue
                            ).length
                        }
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">Goal Deadlines</h2>
                <ul className="space-y-2">
                    {goalStatuses.map((goal, index) => (
                        <li key={index} className="flex justify-between items-center border p-4 rounded-lg">
                            <span className="font-medium">{goal.name}</span>
                            {goal.isComplete ? (
                                <span className="text-green-600 font-semibold">Completed</span>
                            ) : goal.isOverdue ? (
                                <span className="text-red-600 font-semibold">Overdue</span>
                            ) : goal.isNearDeadline ? (
                                <span className="text-yellow-600 font-semibold">
                                    {goal.daysRemaining} day{goal.daysRemaining !== 1 ? 's' : ''} left (⚠)
                                </span>
                            ) : (
                                <span className="text-gray-600 font-semibold">
                                    {goal.daysRemaining} day{goal.daysRemaining !== 1 ? 's' : ''} left
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default OverviewSection;
