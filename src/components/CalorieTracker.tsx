import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {

    //counters
    const caloriesConsumed = useMemo(
        () => activities.reduce((total, currentValue) => currentValue.category === 1 ? total + currentValue.calories : total, 0), [activities]
    )
    const caloriesBurned = useMemo(
        () => activities.reduce((total, currentValue) => currentValue.category === 2 ? total + currentValue.calories : total, 0), [activities]
    )
    return (
        <>
            <h2 className="text-white font-bold text-2xl text-center mb-10">Calorie Summary</h2>

            <div className="flex flex-col md:flex-row justify-between items-center gap-5 px-5">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text='Consumed'
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text=' Burned'
                />

                <CalorieDisplay
                    calories={caloriesConsumed - caloriesBurned}
                    text='Difference'
                />

            </div>

        </>
    )
}
