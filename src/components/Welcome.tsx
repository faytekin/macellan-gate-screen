import { Person } from '@/types/ApiType.ts'

type WelcomeProps = {
    person: Person
}

const Welcome = ({ person }: WelcomeProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center animate-fade animate-once">
                {person.details.avatar_url && (
                    <img
                        src={person.details.avatar_url}
                        alt="Person Avatar"
                        className="w-50 h-50 rounded-full mb-6 animate-jump"
                    />
                )}
                <h1 className="text-8xl font-bold mb-10 animate-jump-in animate-once">
                    {person.first_name} {person.last_name}
                </h1>
            </div>
        </div>
    )
}

export default Welcome
