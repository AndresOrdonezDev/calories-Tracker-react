
type CalorieDisplayProps = {
    calories: number,
    text: string
}

export default function CalorieDisplay({ calories, text }: CalorieDisplayProps) {
    return (
        <p className="text-white font-bold text-center grid grid-cols-1 gap-3 rounded-lg">
            <span className="font-black text-4xl text-orange">{calories}</span>
            {text}
        </p>
    )
}
