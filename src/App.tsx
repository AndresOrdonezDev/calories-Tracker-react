import { useReducer, useEffect } from "react"
import { activityReducer, initialState } from "./reducers/activityReducer"

import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-5">
          <h1 className="text-center text-lg font-bold text-white uppercase">Calories Tracker</h1>
          {
            state.activities.length ? (
              <button
                className="text-white bg-slate-700 px-2 rounded-lg hover:bg-slate-800 transition uppercase text-sm"
                onClick={() => dispatch({type:"restart-app"})}
              >
                Restar APP
              </button>
            ) : ('')
          }
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>

      </section>
      <section className="bg-slate-800 py-10">
          <div className="max-w-4xl mx-auto">
            <CalorieTracker
              activities = {state.activities	}
            />
          </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>

    </>
  )
}

export default App
