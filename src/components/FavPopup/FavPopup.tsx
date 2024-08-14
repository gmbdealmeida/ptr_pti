import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsPlusSquare } from "react-icons/bs";
import Select from 'react-select';
import "./FavPopup.css";

function FavPopup(props: any) {
    console.log("Im in")
    const { t } = useTranslation();
    const [listName, setListName] = useState("")

    function handleClick(){
        props.toggle();
    };

    function handleChange(event: any){
        const {value} = event.target
        setListName(value)
    }

    function lists(listNames: Array<string>) {
        let listFav = []
        for (let i = 0; i < listNames.length; i++){
            listFav.push(
                <option key={i} value={listNames[i]}>{listNames[i]}</option>
            )
        }
        return(
            <select 
                className="selectBar"
                value={listName} 
                name="listName" 
                onChange={handleChange}
            >
                <option value="">-- {t("none")} --</option>
                {listFav}
            </select>
        )
    }

    return (
        
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={handleClick}>
                    &times;
                </span>
                <form> 
                    <h3 className="font-bold text-dark_blue text:lg">{t("choose-the-list")}:</h3>
                    <br />
                    <label className="label">
                        {t("new-list")}:   
                        <input 
                            className="inputBar"
                            type="text" 
                            name="listName" 
                            placeholder={t("your-new-list")} 
                            value={listName} 
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <label className="label">
                        {t("choose-your-list")}:   
                        {lists(props.lists)}
                    </label>
                    <br />
                    <br />
                    <button className="favBtn" type="submit" ><BsPlusSquare size={32}/></button>
                </form>
            </div>
        </div>
    );
    
}

export default FavPopup