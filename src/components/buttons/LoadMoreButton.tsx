interface IProps {
    disable: boolean
    onClick: () => void
    loading: boolean
    title:string
}


const LoadMoreButton = (props: IProps) => {

    const {disable, onClick, loading,title} = props
    return (
        <button
            className={`border p-2 rounded-md mt-4 self-end w-36 mx-auto text-white hover:bg-white hover:text-black duration-300`}
            disabled={disable}
            onClick={onClick}>
            {loading ? "Loading..." : title}
        </button>
    );
};

export default LoadMoreButton;
