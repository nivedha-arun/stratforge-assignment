export const Search = ({ searchFunc }) => {
    return (
        <div className="search">
            <input type="text" id="searchtext" onChange={(e) => searchFunc(e.target.value)} name="search" placeholder="Search by name..."></input>
        </div>
    )
}