import { AiOutlineClose } from "react-icons/ai";

const Tag = ({name,deleteTag}) => {
    return(
        <div className="min-w-16 py-1 px-4 flex flex-row items-center gap-4 rounded-3xl group hover:bg-secondary hover:cursor-pointer border border-gray-400">
            <label className="group-hover:text-white" htmlFor={name}>{name}</label>
            <div
            onClick={deleteTag}
            className="text-secondary group-hover:text-white"><AiOutlineClose size={30}/></div>
        </div>
    )
}
export default Tag