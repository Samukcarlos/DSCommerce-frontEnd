import ButtonPrimary from "../ButtonInverse";

type Props ={
    message: string;
    onDialogClose: Function;
}

export default function DialogInfo({message, onDialogClose}: Props){
    return (
        <div className="desc-dialog-background" onClick={()=> onDialogClose()}>
            <div className="dsc-dialog-box" onClick={(event)=> event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dsc-dialog-btn-container"onClick={()=> onDialogClose()}>
                     <ButtonPrimary text="OK"/>
                </div>
            </div>
        </div>
    )
}