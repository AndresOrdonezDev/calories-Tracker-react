import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo, Dispatch } from "react"
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activityReducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}


export default function ActivityList({ activities, dispatch }: ActivityListProps) {

    const categoryName = useMemo(() =>
        (category: Activity['category']) =>
            categories.map(cat => cat.id === category ? cat.name : ''),
        [activities]
    )
    return (
        <>

            <h1
                className="text-2xl font-bold text-slate-600 text-center mb-8"
            >{activities.length ? 'List Activities' : 'The list is empty'}</h1>

            {activities.map(activity => (

                <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow-lg">

                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-1 text-white uppercase font-bold bg-lime-600 ${activity.category == 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                            {categoryName(+activity.category)}
                        </p>
                        <p className="text-xl font-bold pt-5">
                            {activity.name}
                        </p>
                        <p className="font-bold text-2xl text-lime-500">
                            {activity.calories}
                            <span> Calories</span>
                        </p>
                    </div>

                    <div className="flex gap-5 items-center">
                        <button
                            onClick={() => dispatch({ type: 'get-activeId', payload: { id: activity.id } })}
                        >
                            <PencilSquareIcon
                                className="h-6 w-6 text-gray-800"
                            />
                        </button>
                        <button
                            onClick={() => dispatch({ type: 'remove-activity', payload: { id: activity.id } })}
                        >
                            <TrashIcon
                                className="h-6 w-6 text-red-800"
                            />
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
