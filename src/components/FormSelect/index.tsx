import Select from "react-select";

export default function FormSelect(props: any) {

    const { 
     className,
     validation, 
     invalid="false", 
     disty="false", 
     onTurnDirty, 
     ...selectProps 
} = props;

     function handleBlur() {
          onTurnDirty(props.name); 
     }

    return (

          <div 
               className={className}
               data-onInvalid={invalid}
               data-dirty={disty}
          >
               
           <Select
               {...selectProps} 
               onBlur={handleBlur}
          />
          </div>
     
    );
    }