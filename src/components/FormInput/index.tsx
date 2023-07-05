export default function FormInput(props: any) {

    const { 
     validation, 
     invalid="false", 
     disty="false", 
     onTurnDirty, 
     ...inputProps } = props;

     function handleBlur() {
          onTurnDirty(props.name); 
     }

    return (
         <input 
         {...inputProps} 
         onBlur={handleBlur}
         data-onInvalid={invalid}
         data-dirty={disty}
      />
    );
    }