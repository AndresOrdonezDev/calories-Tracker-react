import { Activity } from "../types"

//new type - separate each action with | 
export type ActivityActions =
    {
        type: 'save-activity',
        payload: { newActivity: Activity }
    } |
    {
        type: 'get-activeId',
        payload: { id: Activity['id'] }
    } |
    {
        type: 'remove-activity',
        payload: {id:Activity['id']}
    }|
    {
        type: 'restart-app'
    }

//state
export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

//state initial

const activitiesLocalStorage = ()=>{
    const activities = localStorage.getItem('activities')

    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: activitiesLocalStorage(),
    activeId: ''
}

//reducer
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    //inside if, handles the logic to update the state


    //create or update a register
    if (action.type === 'save-activity') {

        let updatedActivities:Activity[] = []

        if (state.activeId) {
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    // get activity id
    if (action.type === 'get-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    //remove an activity
    if(action.type === 'remove-activity'){

        return{
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    //restart-app
    if(action.type === 'restart-app'){
        return{
            activities: [],
            activeId:''
        }
    }

    return state
}