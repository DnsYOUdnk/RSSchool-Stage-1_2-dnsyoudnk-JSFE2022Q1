import { IFilterModal } from '../../types';
import './filterModal.css';

export const FilterModal = ({setShowFilterModal, setFilterValue, filterValue}: IFilterModal) => {
    
    const closeFilterModal = (): void => {
        setShowFilterModal(false)
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation()
    }

    const clickFilter = (value: string): void => {
        setFilterValue(value)
    }


    return (
        <div className="filter__modal" onClick={()=>{closeFilterModal()}}>
            <div className="filter__modal__body" onClick={(e)=>handleClick(e)}>
                <h3>Filter</h3>
                <label><input type="radio" defaultChecked={filterValue === "default" ? true : false} onClick={()=>{clickFilter("default")}} name="filter"/>По умолчанию</label>
                <label><input type="radio" defaultChecked={filterValue === "abs" ? true : false} onClick={()=>{clickFilter("abs")}} name="filter"/>По Возрастанию</label>
                <label><input type="radio" defaultChecked={filterValue === "desc" ? true : false} onClick={()=>{clickFilter("desc")}} name="filter"/>По Убыванию</label>
            </div>
        </div>
    )
}