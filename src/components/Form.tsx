import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activityReducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

export default function Form({ dispatch, state }: FormProps) {

    const initialState:Activity = {
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    }

    const [activity, setActivity] = useState<Activity>({
        ...initialState,
        id:uuidv4()
    })

    useEffect(()=>{
        if(state.activeId){
           const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]

            setActivity(selectedActivity)
        }
    },[state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })

    }

    const isValidActivity = () => {
        const { name, calories } = activity

        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({
            type: "save-activity",
            payload: {
                newActivity: activity
            }
        })

        setActivity(initialState)
    }


    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">
                    Categories
                </label>
                <select
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >

                    {categories.map(item => (

                        <option
                            value={item.id}
                            key={item.id}
                        >
                            {item.name}
                        </option>

                    ))}

                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">
                    Name activity
                </label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="example: chinese food, orange juice, running in the park.."
                    onChange={handleChange}
                    value={activity.name}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">
                    Calories
                </label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="example: 300, 50, 100..."
                    onChange={handleChange}
                    value={activity.calories}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">

                <input
                    type="submit"
                    className="bg-slate-700 p-2 text-white font-bold uppercase cursor-pointer w-full hover:bg-slate-800 rounded disabled:opacity-10"
                    value={activity.category === 1 ? 'Save Meal' : 'Save Exercise'}
                    disabled={!isValidActivity()}
                />
            </div>

        </form>
    )
}
