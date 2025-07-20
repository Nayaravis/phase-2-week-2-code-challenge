import Goal from "./Goal.jsx"

function GoalsList({ goalsList }) {
    return (
        <div className="my-2.5 flex flex-col gap-3.5">
            <span className="text-2xl font-semibold">Active Goals</span>
            <div className="flex flex-col gap-2.5">
                {goalsList.map(goal => {
                    return (
                        <Goal
                            key={goal.id}
                            id={goal.id} 
                            name={goal.name}
                            targetAmount={goal.targetAmount} 
                            savedAmount={goal.savedAmount}
                            category={goal.category}
                            deadline={goal.deadline}
                            createdAt={goal.createdAt}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default GoalsList;