
interface IProps{
    title:string
    className?:string
}
const SubTitle = (props:IProps) => {
    const{title,className}=props

    return (
        <h2 className={className}>{title}</h2>
    );
};

export default SubTitle;

