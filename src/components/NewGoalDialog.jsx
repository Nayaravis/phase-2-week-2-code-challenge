function NewGoalDialog({ goalsList, isClicked, updateIsClicked }) {
    return (
        <div 
        className={`absolute z-50 ${isClicked ? "block" : "hidden"} w-full h-screen bg-black/45 flex justify-center items-center`}
        >
            <div className="w-2xl rounded-3xl bg-white p-7">
                <p className="text-3xl font-semibold py-5">Create a new goal</p>
                <form className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="goal-name">Goal Name</label>
                        <input id="goal-name" type="text" className="outline-2 outline-gray-300 p-2 rounded focus:outline-gray-400"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="target-amount">Target Amount</label>
                        <input id="target-amount" type="number" min={1} className="outline-2 outline-gray-300 p-2 rounded focus:outline-gray-400"/>
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
                        <button className="cursor-pointer bg-green-300 p-3 rounded-xl text-green-900 font-semibold" type="submit">Create Goal</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewGoalDialog;