import { Calendar, ChevronRight } from "lucide-react";

function Goal({ id, name, targetAmount, savedAmount, category, deadline, createdAt }) {
    return (
        <div key={id} className="w-full rounded-3xl shadow bg-white p-12 flex flex-col gap-7">
            <div className="flex w-full justify-between items-center">
                <div>
                    <span className="text-xl font-semibold">{name}</span>
                    <div className="flex gap-1 items-center">
                        <Calendar color="gray" size={18}/>
                        <span className="text-gray-500">Created at {createdAt}</span>
                    </div>
                </div>
                <button className="flex gap-1.5 items-center bg-gray-300 p-2 rounded-full cursor-pointer">
                    <span>Add Funds</span>
                    <ChevronRight color="black" size={18}/>
                </button>
            </div>
            <div className="flex gap-24">
                <div>
                    <p className="text-gray-400 font-semibold">CURRENT</p>
                    <p className="text-2xl font-bold">Ksh. {savedAmount}</p>
                </div>
                <div>
                    <p className="text-gray-400 font-semibold">TARGET</p>
                    <p className="text-2xl font-bold">Ksh. {targetAmount}</p>
                </div>
                <div>
                    <p className="text-gray-400 font-semibold">REMAINING</p>
                    <p className="text-2xl font-bold">Ksh. {targetAmount-savedAmount}</p>
                </div>
            </div>
        </div>
    )
}

export default Goal;