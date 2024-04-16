
interface IProps{
    title:string
    onClick?:()=>void
    className?:string
}
const Caption = (props:IProps) => {
    const{title,className,onClick}=props

    return (
        <h6 onClick={onClick} className={className}>{title}</h6>
    );
};

export default Caption;
