export default function FormTextArea(props: any) {

    const { 
     validation, 
     invalid="false", 
     disty="false", 
     onTurnDirty, 
     ...textAreaProps } = props;

     function handleBlur() {
          onTurnDirty(props.name); 
     }

    return (
         <textarea
         {...textAreaProps} 
         onBlur={handleBlur}
         data-onInvalid={invalid}
         data-dirty={disty}
      />
    );
    }