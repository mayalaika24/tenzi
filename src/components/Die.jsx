
export default function Die (props) {
    return (
        <>
            <div onClick={() => props.holdDice(props.id)} className={`die ${props.isHeld ? 'held' : ''}`}>
                <div>
                     {props.value}
                </div>
            </div>
        </>
    )
}