
interface IProps{
    title:string
    className?:string
}
const Title = (props:IProps) => {
const{title,className}=props

    return (
        <h2 className={className}>{title}</h2>
    );
};

export default Title;
