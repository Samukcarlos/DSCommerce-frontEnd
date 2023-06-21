import { useState } from 'react';
import './styles.css';

type Props ={
    onSearch: Function;
}
export default function SearchBar({onSearch}: Props){

    const [text, setText]= useState("");

    function hendleChange(event: any){
        setText(event.target.value);
    }

    function handleResetClick(){
        setText(""); //limpando formulario (searchBar)
        onSearch(text)
    }

    function handleSubmit(event: any){
        event.preventDefault();
        onSearch(text);
    }

    return  (
        <form className="dsc-search-bar" onSubmit={handleSubmit}>
            <button type="submit">🔎︎</button>
            <input 
            value={text}
            type="text" 
            placeholder="Nome do produto" 
            onChange={hendleChange}
            />
            <button onClick={handleResetClick}>X</button>
          </form>
    );
}